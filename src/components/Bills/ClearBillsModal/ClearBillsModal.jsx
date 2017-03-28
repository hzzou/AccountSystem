import React, {Component, PropTypes} from 'react';
import {Form, Input, Modal} from 'antd'
import {modal} from './index.css';

const FormItem = Form.Item;
const formItemLayout = {
    labelCol: {
        span: 6
    },
    wrapperCol: {
        span: 14
    }
};
const ClearBillsModal =({
    visible,
    onConfirm,
    onCancel,
	currentItem,
    form: {
        getFieldDecorator,
        validateFields
    }
})=>{
    function handleConfirm() {
        validateFields((errors, values)=>{
            if(!!errors){
                return;
            }
            onConfirm({customerId: values.customerId});
        })
    }

    const modalOpts = {
        title: '清账操作',
        visible,
        onOk:handleConfirm,
        onCancel
    };

    const {
		customerId,
		customerName,
		totalAmount,
		paymentAmount,
	} = currentItem;

    const clearBillAmount = totalAmount-paymentAmount;

    return (
        <Modal {...modalOpts} className={modal}>
            <Form layout='horizontal'>
				<FormItem {...formItemLayout} style={{margin: 0}}>
					{
						getFieldDecorator('customerId', {
							initialValue: customerId
						})(
							<Input type="hidden"/>
						)
					}
				</FormItem>
                <FormItem label='客户名称：' hasFeedback {...formItemLayout}>
                    {
                        getFieldDecorator('customerName', {
							initialValue: customerName
						})(
                            <Input type="text" disabled={true}/>
                        )
                    }
                </FormItem>
				<FormItem label='应付金额：' hasFeedback {...formItemLayout}>
					{
						getFieldDecorator('totalAmount', {
							initialValue: totalAmount
						})(
							<Input type="text" disabled={true}/>
						)
					}
				</FormItem>
				<FormItem label='已付金额：' hasFeedback {...formItemLayout}>
					{
						getFieldDecorator('paymentAmount', {
							initialValue: paymentAmount
						})(
							<Input type="text" disabled={true}/>
						)
					}
				</FormItem>
				<FormItem label='清账金额：' hasFeedback {...formItemLayout}>
					{
						getFieldDecorator('clearBillAmount', {
							initialValue: clearBillAmount
						})(
							<Input type="text" disabled={true}/>
						)
					}
				</FormItem>
            </Form>
        </Modal>
    );
};

ClearBillsModal.propTypes = {
    visible:PropTypes.any,
    onConfirm:PropTypes.func,
    onCancel:PropTypes.func,
	currentItem:PropTypes.object,
    form:PropTypes.object.isRequired
};
export default Form.create()(ClearBillsModal);