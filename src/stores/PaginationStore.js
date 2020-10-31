import { types, applySnapshot } from 'mobx-state-tree';

const Pagination = types.model({
    page: types.number,
    total: types.number,
    perPage: types.number,
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

export const resolvePaginationStoreType = ({ page = 1, total = 0, perPage = 20, onSelectPage }) => {
    return types
        .model('PaginationStore', {
            pagination: types.optional(Pagination, { page, total, perPage }),
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
            setPerPage(perPage) {
                self.pagination.perPage = perPage;
                onChangePerPage && onChangePerPage(self, page);
            },
        }));
}
