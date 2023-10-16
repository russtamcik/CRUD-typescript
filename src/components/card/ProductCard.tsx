import { Button, Card } from "antd";
import { ProductCardProps } from "../../types/product";
import { DeleteTwoTone, EditTwoTone } from "@ant-design/icons";

const { Meta } = Card;

const ProductCard = ({
  name,
  image,
  id,
  description,
  discount,
  price,
  editProduct,
  deleteProduct,
}: ProductCardProps) => {
  const handleEdit = () => {
    editProduct(id);
  };

  const handleDelete = () => {
    deleteProduct(id);
  };

  return (
    <Card
      hoverable
      cover={
        <img
          height={200}
          src={image}
          alt={name}
          style={{ objectFit: "cover" }}
        />
      }
      style={{ margin: "10px" }}
    >
      <Meta title={name} style={{ marginBottom: "20px" }} />
      <h3>{price} $</h3>
      <h4>{discount}</h4>
      <h5>{description}</h5>
      <Button onClick={handleEdit}>
        <EditTwoTone />
      </Button>
      <Button danger onClick={handleDelete}>
        <DeleteTwoTone />
      </Button>
    </Card>
  );
};

export default ProductCard;
