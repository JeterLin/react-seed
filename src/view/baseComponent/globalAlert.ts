import { Modal as AntdModal } from 'antd';
import { ModalFuncProps } from 'antd/lib/modal';

export function confirm(props: ModalFuncProps): void {
    AntdModal.confirm(props);
}

export function warn(props: ModalFuncProps): void {
    AntdModal.warning(props);
}

export function info(props: ModalFuncProps): void {
    AntdModal.info(props);
}

export function success(props: ModalFuncProps): void {
    AntdModal.success(props);
}

export function error(props: ModalFuncProps): void {
    AntdModal.error(props);
}
