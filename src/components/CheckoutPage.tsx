import { Link, useNavigate } from 'react-router-dom';
import { useStore } from '../context/StoreContext';
import { checkoutProductsBilling } from '../utils/api';
import { useMemo, useState } from 'react';

function CheckoutPage() {
  const { cart, addToCart, removeFromCart, user, toastRef } = useStore();
  const navigate = useNavigate()
  const [isCheckingOut, setisCheckingOut] = useState(false)

  const { cartItems, subtotal } = useMemo(() => {
    const cartItems = Object.values(cart);
    const subtotal = cartItems.reduce(
      (sum, item) => sum + (item.product.price ?? 0) * item.quantity,
      0,
    );

    return { cartItems, subtotal }
  }, [cart])

  // const shipping = subtotal > 0 ? 0 : 0;
  // const total = subtotal + shipping;

  const checkOutBilling = async () => {
    try {
      if (!user) {
        navigate("/login")
        return;
      }
      setisCheckingOut(true);
      let body: { products: any } = {
        products: Object.values(cart)
      }
      await checkoutProductsBilling(body)
      //  if(res.success === false) if (!user) navigate("/login")
    } catch (error) {
      toastRef.current?.show({
        message: "An Error Ocurred while checking out",
        type: 'error',
        duration: 3000,
      })
    } finally {
      setisCheckingOut(false);
    }
  }

  return (
    <>
      <main className="mx-auto max-w-[1200px] px-4 py-6 sm:px-6">
        <div className="mb-5">
          <p className="text-[12px] font-medium uppercase tracking-[0.16em] text-[#565959]">
            Shopping cart
          </p>
          <h1 className="mt-1 text-3xl font-bold text-[#0f1111]">Checkout</h1>
        </div>

        <div className="grid gap-6 lg:grid-cols-[minmax(0,1.7fr)_360px]">
          <section className="rounded-md border border-[#d5d9d9] bg-white p-4 shadow-sm sm:p-6">
            {cartItems.length === 0 ? (
              <div className="rounded-md border border-dashed border-[#d5d9d9] bg-[#fafafa] p-8 text-center">
                <p className="text-lg font-medium text-[#0f1111]">Your cart is empty.</p>
                <Link to="/" className="mt-3 inline-block text-sm font-medium text-[#007185] hover:text-[#c7511f]">
                  Continue shopping
                </Link>
              </div>
            ) : (
              <div className="space-y-4">
                {cartItems.map(({ product, quantity }) => (
                  <div
                    key={product._id}
                    className="grid gap-4 rounded-md border border-[#eaeded] bg-[#fafafa] p-3 sm:grid-cols-[120px_minmax(0,1fr)_160px]"
                  >
                    <img
                      src={product.image}
                      alt={product.title}
                      className="h-28 w-full rounded-md object-contain sm:h-28"
                    />

                    <div className="min-w-0">
                      <p className="text-lg font-medium text-[#0f1111]">{product.title}</p>
                      <p className="mt-1 text-[13px] text-[#565959]">{product.category ?? 'General'}</p>
                      <p className="mt-2 text-sm text-[#565959]">In stock</p>
                      <div className="mt-3 flex items-center gap-2">
                        <button
                          type="button"
                          onClick={() => removeFromCart(product)}
                          className="text-sm text-[#007185] hover:text-[#c7511f]"
                        >
                          Remove
                        </button>
                        <span className="text-[#d5d9d9]">|</span>
                        <button
                          type="button"
                          className="text-sm text-[#007185] hover:text-[#c7511f]"
                        >
                          Save for later
                        </button>
                      </div>
                    </div>

                    <div className="flex flex-col justify-between items-start sm:items-end">
                      <p className="text-2xl font-medium text-[#0f1111]">
                        ${(Number(product.price ?? 0) * quantity).toFixed(2)}
                      </p>

                      <div className="mt-3 flex items-center gap-2 rounded-full border border-[#d5d9d9] bg-white px-2 py-1.5">
                        <button
                          type="button"
                          onClick={() => removeFromCart(product)}
                          className="flex h-7 w-7 items-center justify-center rounded-full bg-[#f3f3f3] text-lg text-[#0f1111] hover:bg-[#e7e7e7]"
                        >
                          −
                        </button>
                        <span className="min-w-[18px] text-center text-sm font-medium text-[#0f1111]">
                          {quantity}
                        </span>
                        <button
                          type="button"
                          onClick={() => addToCart(product)}
                          className="flex h-7 w-7 items-center justify-center rounded-full bg-[#f3f3f3] text-lg text-[#0f1111] hover:bg-[#e7e7e7]"
                        >
                          +
                        </button>
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            )}
          </section>

          <aside className="rounded-md border border-[#d5d9d9] bg-white p-4 shadow-sm sm:p-5">
            <div className="mb-4">
              <h2 className="text-xl font-bold text-[#0f1111]">Order summary</h2>
            </div>

            <div className="space-y-3 text-sm text-[#0f1111]">
              <div className="flex items-center justify-between">
                <span>Subtotal</span>
                <span>${subtotal.toFixed(2)}</span>
              </div>
              {/* <div className="flex items-center justify-between">
                <span>Shipping</span>
                <span>{shipping === 0 ? 'Free' : `$${shipping?.toFixed(2)}`}</span>
              </div> */}
              <div className="flex items-center justify-between">
                <span>Tax</span>
                <span>$0.00</span>
              </div>
            </div>

            <div className="mt-4 border-t border-[#eaeded] pt-4">
              <div className="flex items-center justify-between text-lg font-bold text-[#0f1111]">
                <span>Total</span>
                <span>${subtotal.toFixed(2)}</span>
              </div>
            </div>

            <button
              type="button"
              disabled={cartItems.length === 0 || isCheckingOut}
              className="mt-5 w-full rounded-full bg-[#ffd814] px-4 py-3 text-base font-medium text-[#0f1111] transition hover:bg-[#f7ca00] disabled:cursor-not-allowed disabled:bg-[#e7e7e7] disabled:text-[#565959]"
              onClick={checkOutBilling}
            >
              {isCheckingOut ? "Checking out..." : "Proceed to checkout"}
            </button>

            <div className="mt-4 rounded-md border border-[#d5d9d9] bg-[#fafafa] p-3 text-xs text-[#565959]">
              Secure checkout · Free returns · Prime eligible items
            </div>
          </aside>
        </div>
      </main>
    </>
  );
}

export default CheckoutPage;