import { defineComponent } from 'vue'
export default defineComponent({
    props: {
        vNode: {
            type: [Object, String],
            requred: true
        }
    },
    setup(props) {
        return () => props.vNode
    }
})