import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import { Button, Col, Flex, Form, Input, Modal, Row, Spin } from "antd";
import ProductCard from "../components/card/ProductCard";
import { useAppDispatch, useAppSelector } from "../redux/hooks";
import { ProductCardProps } from "../types/product";
import request from "../server";
import { getProduct } from "../redux/slices/productSlice";

export const ProductPage = () => {
  const { products, loading } = useAppSelector((state) => state.product);
  const dispatch = useAppDispatch();

  const params = useParams();
  const [index] = useState(params.id);

  const [selected, setSelected] = useState<string | null>(null);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [form] = Form.useForm();

  useEffect(() => {
    dispatch(getProduct(index));
  }, [dispatch, index]);

  const closeModal = () => {
    setIsModalOpen(false);
  };

  const showModal = () => {
    setSelected(null);
    setIsModalOpen(true);
    form.resetFields();
  };

  const handleOk = async () => {
    try {
      const values: ProductCardProps = await form.validateFields();
      if (selected === null) {
        await request.post(`category/${params.id}/product`, values);
      } else {
        await request.put(`category/${params.id}/product/${selected}`, values);
      }
      closeModal();
      dispatch(getProduct(index));
    } catch (error) {
      console.log(error);
    }
  };

  const editProduct = async (id: string) => {
    setSelected(id);
    try {
      setIsModalOpen(true);
      const { data } = await request.get(`category/${params.id}/product/${id}`);
      form.setFieldsValue(data);
    } catch (err) {
      console.log(err);
    }
  };

  const deleteProduct = async (id: string) => {
    try {
      await request.delete(`category/${params.id}/product/${id}`);
      dispatch(getProduct(index));
    } catch (err) {
      console.log(err);
    }
  };

  console.log(products);

  return (
    <div>
      <Flex justify="space-between">
        <h1>Products ({products.length})</h1>
        <Button onClick={showModal} className="primary">
          Add
        </Button>
      </Flex>
      <Spin spinning={loading}>
        <Row gutter={8}>
          {products.map((product) => (
            <Col
              style={{ marginBottom: "10" }}
              key={product.id}
              className="gutter-row"
              xs={24}
              sm={12}
              md={8}
              lg={6}
            >
              <ProductCard
                {...product}
                editProduct={editProduct}
                deleteProduct={deleteProduct}
              />
            </Col>
          ))}
        </Row>
      </Spin>
      <Modal
        open={isModalOpen}
        onOk={handleOk}
        onCancel={closeModal}
        title="Products"
      >
        <Form
          name="product"
          form={form}
          labelCol={{ span: 24 }}
          wrapperCol={{ span: 24 }}
          autoComplete="off"
        >
          <Form.Item<ProductCardProps>
            label="Name"
            name="name"
            rules={[{ required: true, message: "Please fill!" }]}
          >
            <Input />
          </Form.Item>

          <Form.Item<ProductCardProps>
            label="Image"
            name="image"
            rules={[{ required: true, message: "Please fill!" }]}
          >
            <Input />
          </Form.Item>
        </Form>
      </Modal>
    </div>
  );
};
