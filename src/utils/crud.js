
import errorHandler from "./dbErrorHandler.js"

export const getOne = model => async (req, res) => {
  req.profile.password = undefined
  res.status(200).json({ data: req.profile })
}

export const getMany = model => async (req, res) => {
  let doc
  const { modelName } = model
  // console.log(modelName)
  if (modelName == "user") {
    doc = await model.find({}).select('email username')
  } else if (modelName == "product") {
    if (req.query) {
      const { query } = req
      if (query.new) {
        // console.log('hi')
        // doc = await model.find({}).limit(8)
        doc = await model.find().sort({created_at: 1}).skip(10).limit(8)
     
      } else if(query.category) {
        // console.log(query.category)
        doc = await model.find({category: query.category})
      }else doc = await model.find({})
    }
  } 

  // console.log("isProduct: ", "product" == model.modelName)
  // console.log(req.query)





  try {
    // if(model ==  "User")
    // const doc = model.modelName == "user" ? await model.find({}).select('email username') : await model.find({})
    res.status(200).json({ data: doc })
  } catch (err) {
    res.status(500).json(err)
  }
}

export const createOne = model => async (req, res) => {
  // if(model.modelName == "Product"){
  //   const { title ,desc,images,price} = req.body
  //   const data = { title,desc,images,price}
  // }
// const {modelName} = model

  try {
    const doc = await model.create(req.body)
    // console.log(doc)
    // console.log(doc)
    
    doc.save((err, doc) => {
      if (err) throw err;

      res.status(201).json({ data: doc })
    })
    // res.status(201).json({data: doc})
  } catch (err) {
    res.status(400).json({ err: errorHandler.getErrMsg(err) })
  }


}

export const updateOne = model => async (req, res) => {
  try {
    // const doc = await model.findOneandUpdate(
    //   req.params.id,
    //    req.body
    // ,
    //   {
    //     new: true
    //   }
    // )
    // const modelProfile = req.profile
    // console.log(modelProfile)
    const doc = _.extend(req.profile, req.body)
    // console.log(doc)
    doc.save((err) => {
      if (err) throw err
      req.profile.password = undefined
      // console.log(doc)
      res.status(200).json({ data: doc })
    })


  } catch (err) {
    res.status(500).json({ err })
  }
}

export const removeOne = model => async (req, res) => {
  try {

    const doc = req.profile;
    // console.log(doc)
    doc.remove((err, deletedModel) => {
      if (err) throw err;
      // const { password, ...response } = deletedModel
      doc.password = undefined
      // console.log(response)
      res.status(200).json({ message: `User ${doc.username} has been deleted sucessfully` })
    })
  } catch (err) {
    res.status(500).json({ error: err })
  }

  //   const doc = await model.findByIdandDelete({
  //     _id: req.params.id
  //   }
  // ).exec()
  // if(!doc) return res.status(400).end()

  // response.status(200).json({data: doc}) 

}

export const getOneById = model => async (req, res, next, id) => {
  let foundModel
  try {
    // console.log(model.modelName)
    foundModel = model.modelName == "cart" ? await model.findOne({ userId: id }) : await model.findById(id)
    // if (model.modelName == "cart") {
    //    foundModel = await model.findOne({ userId: id })
    // } else {
    //    foundModel = await model.findById(id)
    // }
    // const foundModel = await model.findOne({userId: id}) 
    if (!foundModel) throw "Does not exist!"
    // console.log(foundModel)

    req.profile = foundModel;
    next()
  } catch (err) {
    res.status(400).json({ error: err })
  }
}


export const crudControllers = model => ({
  deleteOne: removeOne(model),
  updateOne: updateOne(model),
  getMany: getMany(model),
  getOne: getOne(model),
  getOneById: getOneById(model),
  createOne: createOne(model)
})
