import { useEffect, useState } from "react";
import { Button, Col, Flex, Form, Input, Modal, Row, Spin } from "antd";
import CategoryCard from "../components/card/CategoryCard";

import { useAppDispatch, useAppSelector } from "../redux/hooks";
import { getCategories } from "../redux/slices/categorySlice";
import { CategoryTypes } from "../types/category";
import request from "../server";

const CategoriesPage = () => {
  const { categories, loading } = useAppSelector((state) => state.category);
  const dispatch = useAppDispatch();

  // const nameRef = useRef<HTMLInputElement>();
  const [selected, setSelected] = useState<string | null>(null);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [form] = Form.useForm();

  useEffect(() => {
    dispatch(getCategories());
  }, [dispatch]);

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
      const values: CategoryTypes = await form.validateFields();
      if (selected === null) {
        await request.post("category", values);
      } else {
        await request.put(`category/${selected}`, values);
      }
      closeModal();
      dispatch(getCategories());
    } catch (error) {
      console.log(error);
    }
  };

  const editCategory = async (id: string) => {
    setSelected(id);
    try {
      setIsModalOpen(true);
      const { data } = await request.get(`category/${id}`);
      form.setFieldsValue(data);
    } catch (err) {
      console.log(err);
    }
  };

  const deleteCategory = async (id: string) => {
    try {
      await request.delete(`category/${id}`);
      dispatch(getCategories());
    } catch (err) {
      console.log(err);
    }
  };

  return (
    <div>
      <Flex justify="space-between">
        <h1>Categories ({categories.length})</h1>
        <Button onClick={showModal} className="primary">
          Add
        </Button>
      </Flex>
      <Spin spinning={loading}>
        <Row gutter={8}>
          {categories.map((category) => (
            <Col
              style={{ marginBottom: "10" }}
              key={category.id}
              className="gutter-row"
              xs={24}
              sm={12}
              md={8}
              lg={6}
            >
              <CategoryCard
                {...category}
                editCategory={editCategory}
                deleteCategory={deleteCategory}
              />
            </Col>
          ))}
        </Row>
      </Spin>
      <Modal
        open={isModalOpen}
        onOk={handleOk}
        onCancel={closeModal}
        title="Categories"
      >
        <Form
          name="category"
          form={form}
          labelCol={{ span: 24 }}
          wrapperCol={{ span: 24 }}
          autoComplete="off"
        >
          <Form.Item<CategoryTypes>
            label="Name"
            name="name"
            rules={[{ required: true, message: "Please fill!" }]}
          >
            <Input />
          </Form.Item>

          <Form.Item<CategoryTypes>
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

export default CategoriesPage;
