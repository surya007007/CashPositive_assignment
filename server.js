var express = require('express');
var app = express();
var bodyParser = require('body-parser');
var mongoose = require('mongoose');
var promise = mongoose.connect('mongodb://localhost/myapp', {
  useMongoClient: true,
  /* other options */
});
var PostSchema = mongoose.Schema({
	title:{type: String, required: true},
	body: String,
	tag: {type: String, enum: ['Politics','Economy','Education']},
	posted: {type: Date, default: Date.now}
}, {collection: 'post'});

var PostModel = mongoose.model("PostModel", PostSchema);


app.use(express.static(__dirname + '/public'));
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({extended: true}));
app.post("/api/blogpost", createPost);

app.get("/api/blogpost", getAllPosts);
app.get("/api/blogpost/:id", getPostById);
app.delete("/api/blogpost/:id", deletePost);

app.put("/api/blogpost/:id", updatePost);

function updatePost(req,res) {
	var postId = req.params.id;
	var post = req.body;
	var app= PostModel.update({_id: postId}, {
		title: post.title,
		body: post.body
	});
	app.then(
		function(status) {
			res.sendStatus(200);
		},
		function (err) {
			res.sendStatus(400);
		}
	);
}

function getPostById(req,res) {
	var postId = req.params.id;
	 var app = PostModel.findById({
	 	_id: postId })
	 app.then(
	 	function (post) { 
	 		res.json(post);

	 	},
	 	function (err) {
	 		res.sendStatus(400);
	 	}
	 )

}


function deletePost(req, res) {
	var postId = req.params.id;
	var app = PostModel.remove({_id: postId});
	app.then(
			function( status) {
				res.sendStatus(200);
			}
		 ),
			function (argument) {
				res.sendStatus(400);
				// body...
			}
}



function getAllPosts(req, res) {
	 var app = PostModel.find()
			app.then(

			function(posts) {
				res.json(posts);

			},
			function(err) {
				res.sendStatus(400);

			}
		);
}

function createPost(req, res)
{
	var post = req.body;
	console.log(post);
	var app = PostModel.create(post);
		app.then(
			function(postObj) {

				res.json(200);

			},
			function(error) {
				res.sendStatus(400);

			}

		);

}
app.listen(3000);
