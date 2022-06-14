import { PageProps } from './PageBaseProps';
import { PageEnum } from './PageEnum';

export function G_GO_TO_PAGE(props: PageProps, x: PageEnum) {
    props.setPage(x);
}
