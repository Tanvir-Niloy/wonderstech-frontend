import React, { useEffect, useState } from "react";
import LayoutAdmin from "../../layouts/LayoutAdmin";
import { Link } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import Loader from "../../components/Loader/Loader";
import Alert from "../../components/alert/Alert";
import { useMutate } from "restful-react";
import { getProductById,updateProduct} from "../../redux/actions/productActions";
import {PRODUCT_UPDATE_RESET} from "../../redux/constants/productConstants";



const AdminEditProduct = ({ match, history }) => {


  const productId = match.params.id
  
  const dispatch = useDispatch();
  const [name, setName] = useState("");
  const [price, setPrice] = useState("");
  const [category, setCategory] = useState("");
  const [brand, setBrand] = useState("");
  const [color, setColor] = useState("");
  const [image, setImage] = useState([]);
  const [stock, setStock] = useState(1);
  const [shortDesc, setShortDesc] = useState("");
  const [fullDesc, setFullDesc] = useState("");
  const [discount, setDiscount] = useState(0);
  const [isNew, setIsNew] = useState(false);
  const [saleCount, setSaleCount] = useState(0);
  const [selectedImage, setSelectedImage] = useState();

  const { userInfo } = useSelector((state) => state.userLogin);
  const { loading, error, product } = useSelector((state) => state.productById);

  const productUpdate = useSelector((state) => state.productUpdate)
  const {
    loading: loadingUpdate,
    error: errorUpdate,
    success: successUpdate,
  } = productUpdate

  useEffect(() => {
    if (successUpdate) {
      dispatch({ type: PRODUCT_UPDATE_RESET })
      history.push('/admin/product')
    }
    if (!product.name || product.id !== productId) {
      dispatch(getProductById(productId));
    } else {
      setName(product.name);
      setPrice(product.price);
      setCategory(product.category);
      setBrand(product.brand);
      setColor(product.color);
      setStock(product.stock);
      setImage(product.image);
      setDiscount(product.discount);
      setShortDesc(product.shortDescription);
      setFullDesc(product.fullDescription);
      setSaleCount(product.saleCount);
      setIsNew(product.newProduct);
    }
  }, [userInfo, match, history, product,successUpdate]);

  const { mutate: uploadImage } = useMutate({
    verb: "POST",
    path: "/api/products/image-upload",
  });

  const handleImage = (e) => {
    setSelectedImage(e.target.files[0]);
  };

  const handleImageUpload = () => {
    if (!selectedImage) {
      return;
    }
    const formData = new FormData();
    formData.append("image", selectedImage);
    uploadImage(formData)
      .then((uploadedImg) => {
        setImage([...image, uploadedImg]);
      })
      .catch((err) => console.log("Oooops something went wrrrronggg!!!"));
  };


  const editProductHandler = (e) => {
    e.preventDefault()
    dispatch(
      updateProduct({
        _id:productId,
        name,
        price,
        stock,
        category,
        brand,
        color,
        image,
        discount,
        shortDescription:shortDesc,
        fullDescription: fullDesc,
        saleCount,
        newProduct: isNew,

      })
    )
  }


  return (
    <LayoutAdmin>
      {loadingUpdate ? (
        <Loader />
      ) : errorUpdate ? (
        <Alert variant="danger"> {errorUpdate} </Alert>
      ) : (
        <div className="container py-3">
          <div className="row my-5">
            <div className="col-lg-7 col-md-12 ml-auto mr-auto">
              {/* <div className="col-lg-12"> */}
              <form onSubmit={editProductHandler}>
                <div className="billing-info-wrap">
                  <h2>EDIT PRODUCT</h2>
                  <div className="row">
                    <div className="col-lg-12 col-md-12">
                      <div className="billing-info mb-20">
                        <label>
                          Name <span style={{ color: "red" }}>*</span>{" "}
                        </label>
                        <input
                          value={name}
                          onChange={(e) => setName(e.target.value)}
                          required
                          type="text"
                        />
                      </div>
                    </div>
                    <div className="col-lg-12">
                      <div className="billing-info mb-20">
                        <label>
                          Price <span style={{ color: "red" }}>*</span>
                        </label>
                        <input
                          value={price}
                          onChange={(e) => setPrice(e.target.value)}
                          type="number"
                        />
                      </div>
                    </div>
                    <div className="col-lg-12">
                      <div className="billing-select mb-20">
                        <label>
                          Category <span style={{ color: "red" }}>*</span>
                        </label>
                        <select
                          value={category}
                          required
                          onChange={(e) => setCategory(e.target.value)}
                            >                           
                          <option value="laptop">Laptop</option>
                          <option value="pc">Pc</option>
                          <option value="smartWatch">SmartWatch</option>
                          <option value="macbook">Macbook</option>
                          <option value="smartphone">smartphone</option>
                          <option value="mobile accessories">Mobile Accessories</option>
                          <option value="pc accessories">Pc Accessories</option>
                        </select>
                      </div>
                        </div>
                       
                    <div className="col-lg-12">
                      <div className="billing-info mb-20">
                        <label>
                          Brand<span style={{ color: "red" }}></span>*
                        </label>
                        <input
                          value={brand}
                          onChange={(e) => setBrand(e.target.value)}
                          required
                          type="text"
                          placeholder="Enter product Brand"
                          maxLength="20"
                          minLength="3"
                        />
                      </div>
                    </div>
                    <div className="col-lg-12">
                      <div className="billing-select mb-20">
                        <label>
                          Color <span>*</span>
                        </label>
                        <select
                          value={color}
                          required
                          onChange={(e) => setColor(e.target.value)}
                        >
                          <option value="red">Red</option>
                          <option value="maroon">Maroon</option>
                          <option value="darkred">DarkRed</option>
                          <option value="orange">Orange</option>
                          <option value="gold">	Gold</option>
                          <option value="yellow">Yellow</option>
                          <option value="green">Green</option>
                          <option value="cyan">	Cyan</option>
                          <option value="white">	White</option>
                          <option value="silver">Silver</option>
                          <option value="lightgray">LightGray</option>
                          <option value="darkgray">	DarkGray</option>
                          <option value="gray">	Gray</option>
                          <option value="black">Black</option>  
                        </select>
                      </div>
                        </div>


                    <div className="col-lg-12">
                      <div className="billing-info mb-20">
                        <label>
                          Stock <span style={{ color: "red" }}>*</span>
                        </label>
                        <input
                          value={stock}
                          onChange={(e) => setStock(e.target.value)}
                          required
                          type="number"
                          placeholder="Enter product stock"
                          maxLength="11"
                          minLength="11"
                        />
                      </div>
                    </div>
                    <div className="col-lg-12">
                      <div className="img-prev" hidden={!image}>
                        {image.map((img, i) => (
                          <img
                            className="mr-2 mb-2"
                            key={i}
                            width="160px"
                            height="120px"
                            src={img}
                            alt="products"
                          />
                        ))}
                      </div>
                      <div className="billing-info mb-20">
                        <label>Image (630 X 650)px</label>
                        <input
                          accept=".jpg, .png, .jpeg"
                          // value={image}
                          // onChange={(e) => setImage(e.target.value)}
                          onChange={handleImage}
                          type="file"
                        />
                      </div>
                      <button
                        type="button"
                        onClick={handleImageUpload}
                        hidden={!selectedImage}
                        className="btn btn-info btn-sm mb-3"
                      >
                        {image ? "Uploaded" : "Upload"}
                      </button>
                    </div>
                    <div className="col-lg-12">
                      <div className="billing-info mb-20">
                        <label>Discount</label>
                        <input
                          value={discount}
                          onChange={(e) => setDiscount(e.target.value)}
                          className="billing-address"
                          placeholder="Enter Product discount"
                          type="number"
                        />
                      </div>
                    </div>

                    <div className="col-lg-12">
                      <div className="billing-info mb-20">
                        <label>
                          Sale Count <span style={{ color: "red" }}>*</span>
                        </label>
                        <input
                          required
                          value={saleCount}
                          onChange={(e) => setSaleCount(e.target.value)}
                          className="billing-address"
                          placeholder="Enter Product sale count"
                          type="number"
                        />
                      </div>
                    </div>
                  </div>

                  <div className="additional-info-wrap">
                    <h4>
                      Short Description <span style={{ color: "red" }}>*</span>
                    </h4>
                    <div className="additional-info">
                      {/* <label>Order notes</label> */}
                      <textarea
                        value={shortDesc}
                        onChange={(e) => setShortDesc(e.target.value)}
                        placeholder="Write short description for product"
                        name="message"
                      />
                    </div>
                  </div>

                  <div className="additional-info-wrap">
                    <h4>
                      Full Description <span style={{ color: "red" }}>*</span>
                    </h4>
                    <div className="additional-info">
                      {/* <label>Full Description</label> */}
                      <textarea
                        value={fullDesc}
                        onChange={(e) => setFullDesc(e.target.value)}
                        placeholder="Write full desciption for product"
                        name="message"
                      />
                    </div>
                  </div>

                  <div className="custom-control custom-checkbox">
                    <input
                      type="checkbox"
                      className="custom-control-input"
                      id="customCheck1"
                      checked={isNew}
                      onChange={(e) => setIsNew(e.target.checked)}
                    />
                    <label
                      className="custom-control-label"
                      htmlFor="customCheck1"
                    >
                      New Product
                    </label>
                  </div>
                </div>

                <div className="my-3">
                  <button type="submit" className="btn btn-info">
                    Edit Product
                  </button>
                  <Link to="/admin/product">
                    <button className="btn btn-danger ml-3">Back</button>
                  </Link>
                </div>
              </form>
              {/* </div> */}
            </div>
          </div>
        </div>
      )}
    </LayoutAdmin>
  );
};

export default AdminEditProduct;
