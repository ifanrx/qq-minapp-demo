/**
 * @see https://q.qq.com/wiki/develop/miniprogram/API/interface/interface_feedback.html - 交互 API 文档
 */
export const showToast = qq.showToast
export const hideToast = qq.hideToast
export const showModal = qq.showModal
export const showLoading = qq.showLoading
export const hideLoading = qq.hideLoading
export const showActionSheet = qq.showActionSheet

export function showModalText(text) {
    showModal({
        content: text,
    })
}

export function showToastSuccess(text = '成功') {
    showToast({
        title: text,
        icon: 'success',
        duration: 1000,
    })
}

export function showToastFail(text = '失败') {
    showToast({
        title: text,
        icon: 'none',
        duration: 1000,
    })
}

export function showLoadingText(title = '加载中...') {
    showLoading({
        title
    })
}
