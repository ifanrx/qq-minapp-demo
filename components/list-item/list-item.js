Component({
    properties: {
        last: Boolean,
        arrow: Boolean,
    },
    methods: {
        onTap(e) {
            this.triggerEvent('click', e);
        }
    },
    externalClasses: ['my-class']
})