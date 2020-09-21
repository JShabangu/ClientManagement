module.exports = mongoose => {
  var schema = mongoose.Schema(
    {
      firstName: String,
      lastName: String,
      mobileNumber: Number,
	  id: Number,
	  physicalAddress: String
    });

  schema.method("toJSON", function() {
    const { __v, _id, ...object } = this.toObject();
    object.id = _id;
    return object;
  });

  const Client = mongoose.model("client", schema);
  return Client;
};
