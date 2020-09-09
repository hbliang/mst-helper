import { types, applySnapshot } from 'mobx-state-tree';

const Pagination = types.model({
    page: 1,
    total: 0,
    perPage: 20,
});

const PaginationStore = types
    .model('PaginationStore', {
        pagination: types.optional(Pagination, {}),
    })
    .views(self => ({
    }))
    .actions(self => ({
        setPaginationFromMeta(meta) {
            applySnapshot(self.pagination, {
                page: parseInt(meta.current_page),
                total: parseInt(meta.total),
                perPage: parseInt(meta.per_page),
            });
        },
    }));

export default PaginationStore;

export const resolvePaginationStoreType = ({ onSelectPage }) => {
    return types
        .model('PaginationStore', {
            pagination: types.optional(Pagination, {}),
        })
        .views(self => ({

        }))
        .actions(self => ({
            setPaginationFromMeta(meta) {
                applySnapshot(self.pagination, {
                    page: parseInt(meta.current_page),
                    total: parseInt(meta.total),
                    perPage: parseInt(meta.per_page),
                });
            },
            selectPage(page) {
                self.pagination.page = page;
                onSelectPage && onSelectPage(self, page);
            },
        }));
}
