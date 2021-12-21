import { defineComponent } from 'vue'
export default defineComponent({
  props: ['msg'],
  setup(props: any) {

    const render = () => {
      return (
        <>
          <div>{props.msg}</div>
        </>
      )
    }
    return render
  }
})