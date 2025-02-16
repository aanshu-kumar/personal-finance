import { Form, Modal } from 'antd'
import React from 'react'
import {
    Button,
    DatePicker,
    Input,
    InputNumber,
    Select,
} from 'antd';
import { useForm } from 'antd/es/form/Form';

const AddExpense = ({ isExpanseVisible, setIsExpanseVisible,onFinish }) => {
        const [form] = useForm();
    
    return (
        <div>
            <Modal title="Add Expanse" open={isExpanseVisible} onCancel={() => setIsExpanseVisible(false)} footer={null}>
                <Form variant='underlined' layout='vertical' onFinish={(values)=>{
                    onFinish(values,"income")
                    form.resetFields()
                }}>
                    <Form.Item className='m-0' label="Name" name="Name" rules={[{ required: true, message: 'Please input the name of the Transition!' }]}>
                        <Input />
                    </Form.Item>
                    <Form.Item
                        className='m-0'
                        label="Amount"
                        name="Amount"
                        rules={[{ required: true, message: 'Please input the amount!' }]}
                    >
                        <InputNumber style={{ width: '100%' }} />
                    </Form.Item>
                    <Form.Item
                        className='m-0'
                        label="Date"
                        name="Date"
                        rules={[{ required: true, message: 'Please enter the Date!' }]}
                    >
                        <DatePicker className='w-full' />
                    </Form.Item>
                    <Form.Item
                        label="Tag"
                        name="Tag"
                        rules={[
                            {
                                required: true,
                                message: 'Please Select the correct tag!',
                            },
                        ]}
                    >
                        <Select
                            className='w-full'
                            // onChange={handleChange}
                            options={[
                                {
                                    value: 'Salary',
                                    label: 'Salary',
                                },
                                {
                                    value: 'Investment',
                                    label: 'Investment',
                                },
                                {
                                    value: 'Freelance',
                                    label: 'Freelance',
                                },
                            ]}
                        />
                    </Form.Item>
                    <Form.Item>
                        <Button type="primary" htmlType="submit">
                            Add Income
                        </Button>
                    </Form.Item>
                </Form>
            </Modal>
        </div>
    )
}

export default AddExpense
