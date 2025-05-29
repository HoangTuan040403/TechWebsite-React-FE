import AdminPage from "../pages/AdminPage/AdminPage";
import HomePage from "../pages/HomePage/HomePage";
import NotFoundPage from "../pages/NotFoundPage/NotFoundPage";
import OrderPage from "../pages/OrderPage/OrderPage";
import ProductDetailPage from "../pages/ProductDetailPage/ProductDetailPage";
import ProductsPage from "../pages/ProductsPage/ProductsPage";
import ProfilePage from "../pages/Profile/ProfilePage";
import SearchPage from "../pages/SearchPage/SearchPage";
import SignInPage from "../pages/SignInPage/SignInPage";
import SignUpPage from "../pages/SignUpPage/SignUpPage";
import TypeProductPage from "../pages/TypeProductPage/TypeProductPage";


export const routes = [
    {
        path: '/',
        page: HomePage,
        isShowHeader: true,
        isShowFooter: true
    },
    {
        path: '/order',
        page: OrderPage,
        isShowHeader: true,
        isShowFooter: true

    },
    {
        path: '/products',
        page: ProductsPage,
        isShowHeader: true,
        isShowFooter: true

    },
    {
        path: '/search',
        page: SearchPage,
        isShowHeader: true,
        isShowFooter: true

    },
    {
        path: '/product/:type',
        page: TypeProductPage,
        isShowHeader: true,
        isShowFooter: true


    },
    {
        path: '/sign-in',
        page: SignInPage,
        isShowHeader: false

    },
    {
        path: '/sign-up',
        page: SignUpPage,
        isShowHeader: false

    },

    {
        path: '/product-details/:id',
        page: ProductDetailPage,
        isShowHeader: true,
        isShowFooter: true


    },
    {
        path: '/profile-user',
        page: ProfilePage,
        isShowHeader: true

    },
    {
        path: '/system/admin',
        page: AdminPage,
        isShowHeader: false,
        isPrivate: true
    },
    {
        path: '/order',
        page: OrderPage,
        isShowHeader: true

    },
    {
        path: '*',
        page: NotFoundPage
    }
]