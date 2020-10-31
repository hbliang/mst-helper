import { types, applySnapshot, getRoot } from 'mobx-state-tree';


export const SimplePaginationStore = types
    .model('SimplePaginationStore', {
        page: 1,
        total: 0,
        perPage: 20,
    })
    .views(self => ({
        get root() {
            return getRoot(self);
        }
    }))
    .actions(self => ({
        setFromMeta(meta) {
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

export const resolvePaginationStore = ({ onChangePage, onChangePerPage }) => {
    return SimplePaginationStore
        .named('PaginationStore')
        .actions(self => {
            const superSetPage = self.setPage;
            const superSetPerPage = self.setPerPage;

            return {
                setPage(page) {
                    superSetPage(page);
                    onChangePage && onChangePage(self, page);
                },
                setPerPage(perPage) {
                    superSetPerPage(perPage);
                    onChangePerPage && onChangePerPage(self, perPage);
                }
            }
        });
}