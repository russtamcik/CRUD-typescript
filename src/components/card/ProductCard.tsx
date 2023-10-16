import { Button, Card } from "antd";
import { ProductCardProps } from "../../types/product";

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
      <p>{description}</p>
      <p>{discount}</p>
      <p>{price}</p>
      <Button onClick={handleEdit}>Edit</Button>
      <Button danger onClick={handleDelete}>
        Delete
      </Button>
    </Card>
  );
};

export default ProductCard;
