import { Form, Modal } from "antd";
import { Button, DatePicker, Input, InputNumber, Select } from "antd";

// eslint-disable-next-line react/prop-types
const AddExpense = ({ isExpanseVisible, setIsExpanseVisible, onFinish }) => {
  const [form] = Form.useForm();
  return (
    <div>
      <Modal
        title="Add Expanse"
        open={isExpanseVisible}
        onCancel={() => setIsExpanseVisible(false)}
        footer={null}>
        <Form
          variant="underlined"
          layout="vertical"
          onFinish={(values) => {
            onFinish(values, "Expanse");
            form.resetFields();
          }}>
          <Form.Item
            className="m-0"
            label="Name"
            name="Name"
            rules={[
              {
                required: true,
                message: "Please input the name of the Transition!",
              },
            ]}>
            <Input />
          </Form.Item>
          <Form.Item
            className="m-0"
            label="Amount"
            name="Amount"
            rules={[{ required: true, message: "Please input the amount!" }]}>
            <InputNumber style={{ width: "100%" }} />
          </Form.Item>
          <Form.Item
            className="m-0"
            label="Date"
            name="Date"
            rules={[{ required: true, message: "Please enter the Date!" }]}>
            <DatePicker className="w-full" />
          </Form.Item>
          <Form.Item
            label="Tag"
            name="Tag"
            rules={[
              {
                required: true,
                message: "Please Select the correct tag!",
              },
            ]}>
            <Select
              className="w-full"
              // onChange={handleChange}
              options={[
                {
                  value: "Food",
                  label: "Food",
                },
                {
                  value: "Shopping",
                  label: "Shopping",
                },
                {
                  value: "Other",
                  label: "Other",
                },
              ]}
            />
          </Form.Item>
          <Form.Item>
            <Button type="primary" htmlType="submit">
              Add Expanse
            </Button>
          </Form.Item>
        </Form>
      </Modal>
    </div>
  );
};

export default AddExpense;
