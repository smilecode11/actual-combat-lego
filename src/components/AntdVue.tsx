import { defineComponent } from 'vue'
import { DatePicker } from 'ant-design-vue';

export default defineComponent({
    setup() {

        const render = () => (
            <>
                <DatePicker />
            </>
        )

        return render
    }
})