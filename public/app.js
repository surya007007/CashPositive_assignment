(function () {
	var app = angular.module("BlogApp", []);
		app.controller("BlogController", BlogController);
		app.config(['$qProvider', function ($qProvider) {
    $qProvider.errorOnUnhandledRejections(false);
}]);

	function BlogController($scope, $http)
	{
		$scope.createPost = createPost;
		$scope.deletePost = deletePost;
		$scope.editPost = editPost;
		$scope.updatePost = updatePost;
		function init() {
				getAllPosts();
		}

		init();

		function updatePost(post){
			console.log(post);
			$http
				.put("/api/blogpost/"+post._id, post);
				.success(getAllPosts);
		}
		function editPost(postId)	{

			$http
				.get("/api/blogpost/" + postId);
				.success(function(post) {
					$scope.post = post;

				});
		}
		function getAllPosts()
		{
			 $http
			 	.get("/api/blogpost");
				.success(function(posts){
					$scope.posts = posts;
			
			});
		}

		function deletePost(postId)
		{
			$http
				.delete("/api/blogpost/" + postId)
				.success(getAllPosts);

		}
		function createPost(post)
		{
			console.log(post);
			$http.post("/api/blogpost", post);
			.success(getAllPosts);

		}
	}
})();