import paypal from "paypal-node-sdk"

paypal.configure({
    mode : "sandbox",
    client_id : "Ac_tcvdZsKWGuY7T2OeBm6SaFagonlxw_iXyXWzE3sm_VMWkOe-jH2c_hFCJjJ6CGmr7VnvwLNCUlQmz",
    client_secret : "ELg6tS3AUIvgD9r1oL9TSNGijJMESwZDCV1JigDEK23K1a-jP8IZoSs4i8TWB9BhF6TbttRCgMr4-IjC"
})


export default paypal