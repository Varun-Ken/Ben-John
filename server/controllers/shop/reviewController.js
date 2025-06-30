import Review from "../../models/review.js";

export const addReview = async (req, res) => {
  try {
    const { productId, userId, reviewMsg, reviewValue } = req.body;
    console.log("pass", productId, userId, reviewMsg, reviewValue);

    if (!productId || !userId || !reviewValue) {
      return res.status(400).json({
        success: false,
        message: "Please provide all the required data fields",
      });
    }
    const alreadyExists = await Review.find({ productId, userId });
    console.log("alreadyExists", alreadyExists);
    if (alreadyExists.length > 0) {
      console.log("Product already exists in review");
      await Review.updateOne(
        { productId, userId },
        { $set: { reviewMsg, reviewValue } }
      );
      console.log(`Review updated successfully for product`, alreadyExists);
      res.status(200).json({
        success: true,
        message: "Review updated successfully",
        data: alreadyExists,
      });
    } else {
      const newReview = new Review({
        productId,
        userId,
        reviewMsg,
        reviewValue,
      });

      await newReview.save();
      console.log(`Review added successfully for product`);
      res.status(200).json({
        success: true,
        message: "Review added successfully",
        data: newReview,
      });
    }
  } catch (error) {
    console.log(`Error in addReview Controller: ${error}`);
    res.status(500).json({
      success: false,
      message: "Internal Server Error",
    });
  }
};

export const getProductReviews = async (req, res) => {
  try {
    const { productId } = req.params;
    if (!productId) {
      return res.status(400).json({
        success: false,
        message: "Product ID is required",
      });
    }
    const reviews = await Review.find({ productId }).populate("userId", "userName");
    res.status(200).json({
      success: true,
      data: reviews,
    });
  } catch (error) {
    console.log(`Error in getReviews Controller: ${error}`);
    res.status(500).json({
      success: false,
      message: "Internal Server Error",
    });
  }
}