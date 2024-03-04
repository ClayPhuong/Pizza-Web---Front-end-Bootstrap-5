var app = angular.module("myapp", ["ngRoute"]);
app.config (function ($routeProvider) {
    $routeProvider.when("/trangchu", {
        templateUrl: "trangchu.html"
    })
    .when("/khuyenmai", {
        templateUrl: "khuyenmai.html"
    })
    .when("/thucdon", {
        templateUrl: "thucdon.html"
    })
    .when("/blog", {
        templateUrl: "blog.html"
    })
    .when("/dangnhap", {
        templateUrl: "dangnhap.html"
    })
    .when("/quenmk", {
        templateUrl: "quenmk.html"
    })
    .when("/dangky", {
        templateUrl: "dangky.html"
    })
    .when("/doimk", {
        templateUrl: "doimk.html"
    })
    .when("/hoso", {
        templateUrl: "hoso.html"
    })
    .when("/donhang", {
        templateUrl: "donhang.html"
    })
    .when("/hangdamua", {
        templateUrl: "hangdamua.html"
    })
    .when("/giohang", {
        templateUrl: "giohang.html"
    })
    .when("/chitietsp", {
        templateUrl: "chitietsp.html"
    })
    .otherwise ({
        redirectTo: "/trangchu"
    })
});

app.run(function ($rootScope) {
    $rootScope.$on('$routeChangeStart', function () {
        $rootScope.loading = true;
    });
    $rootScope.$on('$routeChangeSuccess', function () {
        $rootScope.loading = false;
    });
    $rootScope.$on('$routeChangeError', function () {
        $rootScope.loading = false;
        alert("Lỗi, không tải được template!");
    });
});

app.controller("productCtrl", function($scope, $rootScope, $http) { 
    $scope.products = [];
    $scope.itemsPerPage = 6; // Số sản phẩm trên mỗi trang

    // Tính toán số trang dựa trên số sản phẩm và số sản phẩm trên mỗi trang
    $scope.totalPages = Math.ceil($scope.products.length / $scope.itemsPerPage);

    $scope.currentPage = 1; // Trang hiện tại

    $scope.setPage = function(page) {
        $scope.currentPage = page;
    };

    $scope.getPages = function(totalPages) {
        return new Array(totalPages);
    };

    $http.get("listPizza.json").then(function (response) {
        $scope.products = response.data;
        if ($scope.products==null) {
            alert('Không tìm thấy dữ liệu');
        }
        $scope.totalPages = Math.ceil($scope.products.length / $scope.itemsPerPage);
    });
    $scope.prop = "name";
    $scope.sortBy = function (prop) {
        $scope.prop = prop;
    }
    $scope.begin=0;

    $rootScope.selectedProduct = {};
    $scope.showProducDetail = function (product) {
        $rootScope.selectedProduct = product;
    }

   
    // $scope.pageCount=Math.ceil($scope.products.length/6);
    // $scope.first = function () {
    //     $scope.begin=0;
    // }
    // $scope.prev = function () {
    //     if ($scope.begin>0) {
    //         $scope.begin -= 6;
    //     }
    // }
    // $scope.next = function () {
    //     if ($scope.begin < ($scope.pageCount-1)*8) {
    //         $scope.begin+=6;
    //     }
    // }
    // $scope.last = function () {
    //     $scope.begin = ($scope.pageCount-1)*6;
    // }
});

app.controller("blogCtrl", function($scope, $http) { 
    $scope.blogs = [];
    $http.get("listBlog.json").then(function (response) {
        $scope.blogs = response.data;
        $scope.pageCount=Math.ceil($scope.blogs.length/8);
    });
    $scope.prop = "title";
    $scope.sortBy = function (prop) {
        $scope.prop = prop;
    }
    $scope.begin=0;
    $scope.pageCount=Math.ceil($scope.blogs.length/8);
});

app.controller("saleCtrl", function($scope, $http) { 
    $scope.sales = [];
    $http.get("listSale.json").then(function (response) {
        $scope.sales = response.data;
        $scope.pageCount=Math.ceil($scope.sales.length/8);
    });
    $scope.prop = "title";
    $scope.sortBy = function (prop) {
        $scope.prop = prop;
    }
    $scope.begin=0;
    $scope.pageCount=Math.ceil($scope.sales.length/8);
});

app.controller("extraMealsCtrl", function($scope, $http) { 
    $scope.meals = [];
    $http.get("listMonPhu.json").then(function (response) {
        $scope.meals = response.data;
        $scope.pageCount=Math.ceil($scope.meals.length/8);
    });
    $scope.prop = "name";
    $scope.sortBy = function (prop) {
        $scope.prop = prop;
    }
    $scope.begin=0;
    $scope.pageCount=Math.ceil($scope.meals.length/8);
});

app.controller("dessertCtrl", function($scope, $http) { 
    $scope.desserts = [];
    $http.get("listTrangMieng.json").then(function (response) {
        $scope.desserts = response.data;
        $scope.pageCount=Math.ceil($scope.desserts.length/8);
    });
    $scope.prop = "name";
    $scope.sortBy = function (prop) {
        $scope.prop = prop;
    }
    $scope.begin=0;
    $scope.pageCount=Math.ceil($scope.desserts.length/8);
});

app.controller("waterCtrl", function($scope, $http) { 
    $scope.waters = [];
    $http.get("listThucUong.json").then(function (response) {
        $scope.waters = response.data;
        $scope.pageCount=Math.ceil($scope.waters.length/8);
    });
    $scope.prop = "name";
    $scope.sortBy = function (prop) {
        $scope.prop = prop;
    }
    $scope.begin=0;
    $scope.pageCount=Math.ceil($scope.waters.length/8);
});

app.controller("detailCtrl", function($scope, $rootScope) {

    $scope.debanh="Đế dày";
    $scope.cobanh="Cỡ 12 inch";
    $scope.tuychonthem="";
    $scope.chonvien="";

    // Số lượng mặc định
    $scope.quantity = 1;

    // Hàm giảm số lượng
    $scope.bot = function () {
        if ($scope.quantity > 1) {
            $scope.quantity -= 1;
        }
    };

    // Hàm tăng số lượng
    $scope.them = function () {
        $scope.quantity += 1;
    };

    if (!$rootScope.cartItems) {
        $rootScope.cartItems = [];
    }

    $scope.addToCart = function (product) {
        // Lấy thông tin sản phẩm và các tùy chọn
        var selectedProduct = $scope.selectedProduct;
        var name = selectedProduct.name;
        var img = selectedProduct.img;
        var price = selectedProduct.price;
        var debanh = $scope.debanh;
        var cobanh = $scope.cobanh;
        var tuychonthem = $scope.tuychonthem;
        var chonvien = $scope.chonvien;
        var quantity = $scope.quantity;
        var tong = price * quantity;
        if (cobanh=="Cỡ 12 inch") {
            tong = tong + (50000 * quantity);
        }
        if (tuychonthem=="Thêm phô mai") {
            tong = tong + (24500 * quantity);
        } else if (tuychonthem=="Gấp đôi phô mai") {
            tong = tong + (44500 * quantity);
        } else if (tuychonthem=="Gấp 3 phô mai") {
            tong = tong + (64000 * quantity);
        }
        if (chonvien=="Viền phô mai") {
            tong = tong + (58000 * quantity);
        } else if (chonvien=="Viền xúc xích") {
            tong = tong + (68000* quantity);
        } else if (chonvien=="Viền xúc xích phô mai") {
            tong = tong + (97500* quantity);
        }
    
        // Tạo một đối tượng đại diện cho sản phẩm đã chọn
        var cartItem = {
          name: selectedProduct.name,
          img: selectedProduct.img,
          price: selectedProduct.price,
          debanh: debanh,
          cobanh: cobanh,
          tuychonthem: tuychonthem,
          chonvien: chonvien,
          quantity: quantity,
          tong: tong
        };
    
        // Thêm sản phẩm vào giỏ hàng (mảng danh sách sản phẩm đã chọn)
        $rootScope.cartItems.push(cartItem);
        console.log(cartItem);
        console.log(cartItem.debanh);
        console.log(cartItem.cobanh);
        console.log(cartItem.tuychonthem);
        console.log(cartItem.chonvien);
        // Tùy chỉnh xử lý thêm vào giỏ hàng, ví dụ: hiển thị thông báo thành công
        alert('Sản phẩm đã được thêm vào giỏ hàng.');

        $scope.addToCart = function() {
            CartService.addToCart();
        };
    };
});

app.controller("giohangCtrl", function($scope, $rootScope) {
    if (!$rootScope.cartItems) {
        $rootScope.cartItems=[];
    }
    $scope.cartItems = $rootScope.cartItems;

    // Hàm tính tổng giá trị
    $scope.tinhTong = function() {
        let total = 0;
        for (let i = 0; i < $scope.cartItems.length; i++) {
            total += $scope.cartItems[i].tong * $scope.cartItems[i].quantity;
        }
        return total;
    };

    // Số lượng mặc định
    $scope.quantity = 1;

    // Hàm giảm số lượng
    $scope.bot = function (item) {
        if (item.quantity > 1) {
            item.quantity -= 1;
        }
    };

    // Hàm tăng số lượng
    $scope.them = function (item) {
        item.quantity += 1;
    };

    $scope.xoaSanPham = function(index) {
        $scope.cartItems.splice(index, 1);
    };

    console.log($rootScope.cartItems.length);
    $rootScope.cartLength = $rootScope.cartItems.length;
});

// app.service('CartService', function() {
//     this.cartItemCount = 0;

//     this.getCartItemCount = function() {
//         return this.cartItemCount;
//     };

//     this.addToCart = function() {
//         this.cartItemCount++;
//     };
// });

app.controller("mainCtrl", function($scope, $rootScope) {
    $scope.cartLength = $rootScope.cartLength;
});

