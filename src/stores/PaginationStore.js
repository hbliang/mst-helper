import { types, applySnapshot, getRoot } from 'mobx-state-tree';


export const SimplePaginationStore = types
    .model('SimplePaginationStore', {
        page: 0,
        total: 0,
        perPage: 20,
    })
    .views(self => ({
        get root() {
            return getRoot(self);
        }
    }))
    .actions(self => ({
        setPaginationFromMeta(meta) {
            applySnapshot(self, {
                page: parseInt(meta.current_page),
                total: parseInt(meta.total),
                perPage: parseInt(meta.per_page),
            });
        },
        setPage(page) {
            self.page = page;
        },
        setPerPage(perPage) {
            self.perPage = perPage;
        },
    }));


export const resolvePaginationStore = ({ page = 0, total = 0, perPage = 20, onPageChange, onPerPageChange }) => {
    return types.compose(
        SimplePaginationStore
            .named('PaginationStore')
            .views(self => {
                const superSetPage = self.setPage;
                const superSetPerPage = self.setPerPage;

                return {
                    setPage(page) {
                        superSetPage(page);
                        onPageChange && onPageChange(self, page);
                    },
                    setPerPage(perPage) {
                        superSetPerPage(perPage);
                        onPerPageChange && onPerPageChange(self, page);
                    },
                }
            }),
        types.model({
            page,
            total,
            perPage,
        }))
        .named('PaginationStore')
}