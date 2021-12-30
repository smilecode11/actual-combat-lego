import { defineComponent, computed, PropType, VNode } from 'vue'
import { reduce } from 'lodash-es'
import { mapPropsToForms } from '@/packages/mapProps'
import { TextComponentProps } from '@/packages/defaultProps'

interface FormProps {
    component: string;
    subComponent?: string; //	子组件
    value?: string;
    extraProps?: { [key: string]: any }; //  拓展属性
    text: string;
    options?: { value: any; text: string | VNode }[]; //	子组件扩展属性
    valueProps: string; //	取值使用的 key
    eventName: string;
    events: { [key: string]: (e: any) => void }; //	事件
}

import { Slider, Select, Input, InputNumber, Radio } from 'ant-design-vue'

const mapComponents = {
    'a-input': Input,
    'a-textarea': Input.TextArea,
    'a-slider': Slider,
    'a-select': Select,
    'a-select-option': Select.Option,
    'a-input-number': InputNumber,
    'a-radio-group': Radio.Group,
    'a-radio-button': Radio.Button
} as { [key: string]: any }

const getEventName = (eventName: string) => {
    return eventName.charAt(0).toUpperCase() + eventName.slice(1)
}

export default defineComponent({
    props: {
        props: {
            type: Object as PropType<Partial<TextComponentProps>>,
            required: true
        }
    },
    emits: ['change'],
    setup(props, context) {
        const finallyProps = computed(() => reduce(props.props, (result, value: any, key) => {
            const newKey = key as keyof TextComponentProps
            const item = mapPropsToForms[newKey]
            if (item) {
                const { eventName = "change", valueProps = "value", initTransform, afterTransform } = item
                const newItem: FormProps = {
                    ...item,
                    value: initTransform ? initTransform(value) : value,
                    eventName,
                    valueProps,
                    events: {
                        ['on' + getEventName(eventName)]: (e: any) => context.emit('change', { key, value: afterTransform ? afterTransform(e) : e })
                    }
                }
                result[newKey] = newItem;
            }
            return result
        }, {} as { [key: string]: FormProps }))

        const render = () =>
            <div class="props-table">
                {
                    Object.keys(finallyProps.value).map((key) => {
                        const item = finallyProps.value[key];
                        const ComponentName = mapComponents[item.component];
                        const SubComponetName = mapComponents[item.subComponent as string];
                        const props = {
                            [item.valueProps]: item.value,
                            ...item.extraProps,
                            ...item.events
                        }

                        return (
                            <div class="prop-item">
                                {item.text && <span class="label">{item.text}</span>}
                                <div class="prop-component">
                                    <ComponentName {...props}>
                                        {item.options &&
                                            item.options.map((option) => {
                                                return (
                                                    <SubComponetName value={option.value}>{option.text}</SubComponetName>
                                                )
                                            })
                                        }
                                    </ComponentName>
                                </div>
                            </div>
                        )
                    })
                }
            </div>

        return render;
    }
})
