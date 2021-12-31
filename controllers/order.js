const Order = require('../controllers/order')


exports.orderProduct = function(req, res) {
    const {
      paymentMethod,
      items,
      user,
      totalPaid,
      isDelivered,
      deliveredAt,
      orderId,
      TotalPaid,
  
    } = req.body;
    var order = new Order();
    order.paymentMethod = paymentMethod;
    order.items = items;
    order.user = user;
    order.totalPaid = totalPaid;
    order.isDelivered = isDelivered;
    order.deliveredAt = deliveredAt;
    order.orderId = orderId,
    order.TotalPaid = TotalPaid
  
    order.save((err) => {
      if (err) {
        console.log(err);
      } else {
        res.send("kksksk");
      }
    });
  };


  exports.getOrderbyUser = function(req,res){
    const user = req.query.userId
    console.log('wah')
    
    
    Order.find({})
      .where({'user': user})
      .populate({
        path:'user',
        
        populate:{ path:'primaryAddress'}
      })
      .exec((err,orders)=>{
        if(err){
          console.log(err)
          return res.status(422).send({err})
        }
        return res.json(orders)
      })
  }
  