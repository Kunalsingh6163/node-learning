const User = require("../models/user")

async function handleGetAlluser(req, res){
    const allDbUsers = await User.find({});
    return res.json(allDbUsers);

};

async function apiAllUserList(req, res) {
    const alldbusers = await User.find({});
    const html = `<ul>
      ${alldbusers
        .map((user) => `<li>${user.first_name} - </li> <li>${user.email}</li>`)
        .join("")}
      </ul>`;
    res.send(html);
  };

  

module.exports = {handleGetAlluser, apiAllUserList}