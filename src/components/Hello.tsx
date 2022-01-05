import { defineComponent } from 'vue'
export default defineComponent({
    props: ['msg'],
    setup(props) {
        const render = () => <>
            <h2>hello</h2>
            {props.msg}
        </>

        return render
    }
})