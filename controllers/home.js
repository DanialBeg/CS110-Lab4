// Controller handler to handle functionality in home page

// Example for handle a get request at '/' endpoint.

function getHome(request, response){
  // do any work you need to do, then
  response.render('home', {title: 'home'});
}

module.exports = {
    getHome
};