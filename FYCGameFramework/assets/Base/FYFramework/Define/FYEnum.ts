export module FYEnum {
    export enum Event {
        /** 改变视图的值 */
        ChangeViewValue = 'ChangeViewValue',
        /** 改变数据模型的值 */
        ChangeModelValue = 'ChangeModelValue',
    }

    export enum UIEvent {
        /** 按钮点击事件 */
        ButtonClick = 'click',
        /** 编辑开始 */
        EditBoxEditingBegan = 'editing-did-began',
        /** 编辑结束 */
        EditBoxEditingEnded = 'editing-did-ended',
        /** 编辑返回 */
        EditBoxEditingReturn = 'editing-return',
        /** 文本发生变化 */
        EditBoxTextChanged = 'text-changed',
        /** 滚动到顶部 */
        ScrollViewScrollToTop = 'scroll-to-top',
        /** 滚动到底部 */
        ScrollViewScrollToBottom = 'scroll-to-bottom',
        /** 滚动到左边 */
        ScrollViewScrollToLeft = 'scroll-to-left',
        /** 滚动到右边 */
        ScrollViewScrollToRight = 'scroll-to-right',
        /** 滚动中 */
        ScrollViewScrolling = 'scrolling',
        /**  */
        ScrollViewBounceBottom = 'bounce-bottom',
        /**  */
        ScrollViewBounceTop = 'bounce-top',
        /**  */
        ScrollViewBounceLeft = 'bounce-left',
        /**  */
        ScrollViewBounceRight = 'bounce-right',
        /** 滚动结束 */
        ScrollViewScrollEnded = 'scroll-ended',
        /** 触摸抬起 */
        ScrollViewTouchUp = 'touch-up',
        /** 滚动开始 */
        ScrollViewScrollBegan = 'scroll-began',
        /**  */
        Toggle = 'toggle',
        /**  */
        SliderSlide = 'slide',
        /** 翻页事件 */
        PageViewPageTurning = 'page-turning',
    }

}