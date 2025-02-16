import { Form, Modal } from 'antd'
import React from 'react'
import {
    Button,
    DatePicker,
    Input,
    InputNumber,
    Select,
} from 'antd';
const AddIncome = ({ isIncomeVisible, setIsIncomeVisible,onFinish }) => {
const[form] = Form.useForm();
    return (
        <div>
            <Modal title="Add income" open={isIncomeVisible} onCancel={() => setIsIncomeVisible(false)} footer={null}>
                <Form variant='underlined' layout='vertical' 
                onFinish={(values)=>{
                    onFinish(values,"income")
                    form.resetFields();
                }}>
                    <Form.Item className='m-0' label="Name" name="Name" rules={[{ required: true, message: 'Please input!' }]}>
                        <Input />
                    </Form.Item>
                    <Form.Item
                        className='m-0'
                        label="Amount"
                        name="Amount"
                        rules={[{ required: true, message: 'Please input!' }]}
                    >
                        <InputNumber style={{ width: '100%' }} />
                    </Form.Item>
                    <Form.Item
                        className='m-0'
                        label="Date"
                        name="DatePicker"
                        rules={[{ required: true, message: 'Please input!' }]}
                    >
                        <DatePicker className='w-full' />
                    </Form.Item>
                    <Form.Item
                        label="Tag"
                        name="Tag"
                        rules={[
                            {
                                required: true,
                                message: 'Please input!',
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

export default AddIncome
