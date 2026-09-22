import { useCallback, useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import Loader from './Loader';
import { useStore } from '../context/StoreContext';
import { fetchUserOrders, initiateReturns } from '../utils/api';
import type { Order } from '../data/types';

export default function UserProfile() {
    const { user } = useStore();
    const navigate = useNavigate();
    const [orders, setOrders] = useState<Order[]>([]);
    const [loading, setLoading] = useState(true);
    const [category, setCategory] = useState("paid")
    const [ordersCount, setOrdersCount] = useState<any[]>([])
    const [ordersCountLoading, setOrdersCountLoading] = useState(true);

    const fetchOrders = useCallback((status: string, count?: boolean) => {
        if (!count) {
            setLoading(true);
        } else {
            setOrdersCountLoading(true);
        }
        fetchUserOrders(status, count)
            .then((response) => {
                if (!count) {
                    setOrders(response.orders ?? [])
                } else {
                    setOrdersCount(response?.orderCount)
                }
            })
            .finally(() => {
                setLoading(false)
                setOrdersCountLoading(false);
            });
    }, [])

    useEffect(() => {
        if (!user) {
            navigate('/login', { replace: true, state: { from: '/profile' } });
            return;
        }
        fetchOrders(category)
        fetchOrders(category, true)
    }, [user, navigate]);

    const productReturns = useCallback(async (id: string) => {
        try {
            const res = await initiateReturns(id)
            console.log(res);
            fetchUserOrders(category)
                .then((response) => setOrders(response.orders ?? []))
                .finally(() => setLoading(false));
        } catch (error) {
            console.log(error);
        }
    }, [])

    if (!user) return null;

    return (
        <main className="mx-auto max-w-[1200px] px-4 py-7 sm:px-6">
            <p className="text-[12px] font-medium uppercase tracking-[0.16em] text-[#565959]">Your account</p>
            <h1 className="mt-1 text-3xl font-bold text-[#0f1111]">Profile</h1>

            <section className="mt-6 grid gap-5 md:grid-cols-2">
                <div className="rounded-md border border-[#d5d9d9] bg-white p-5 shadow-sm">
                    <h2 className="text-xl font-bold">Account details</h2>
                    <dl className="mt-5 space-y-4 text-sm">
                        <div><dt className="text-[#565959]">Name</dt><dd className="mt-1 font-medium">{user.name}</dd></div>
                        <div><dt className="text-[#565959]">Email</dt><dd className="mt-1 font-medium">{user.email ?? 'Not provided'}</dd></div>
                        <div><dt className="text-[#565959]">Customer ID</dt><dd className="mt-1 break-all font-medium">{user.id ?? user._id ?? user.uuid ?? 'Unavailable'}</dd></div>
                    </dl>
                </div>

                <div id="orders" className="rounded-md border border-[#d5d9d9] bg-white p-5 shadow-sm">
                    <h2 className="text-xl font-bold">Orders</h2>
                    {ordersCountLoading ? <Loader size='lg' /> : <>
                        {
                            ordersCount?.map(e => {
                                return <p key={e?._id} className="mt-2 text-sm text-[#565959]">{e.count} {e?._id} {e?.count === 1 ? 'order' : 'orders'}</p>
                            })
                        }
                    </>}
                </div>
            </section>

            <section className="mt-5 rounded-md border border-[#d5d9d9] bg-white p-5 shadow-sm">
                <div className='flex items-center justify-between'>
                    <h2 className="text-xl font-bold">Past orders</h2>
                    <select
                        id="search-category"
                        value={category}
                        onChange={(e) => {
                            fetchOrders(e.target.value)
                            setCategory(e.target.value)
                        }
                        }
                        className="max-w-30 shrink-0 cursor-pointer rounded-full border border-[#d5d9d9] bg-white px-3 py-2 text-[12px] font-medium text-[#0f1111] shadow-sm outline-none transition hover:border-[#007185] hover:bg-[#f7fafa] focus:border-[#007185] focus:ring-2 focus:ring-[#ffd814]"
                    >
                        <option value="pending">Pending</option>
                        <option value="paid">Paid</option>
                        <option value="cancelled">Cancelled</option>
                        <option value="returned">Returned</option>
                    </select>
                </div>
                {loading ? <div className="flex justify-center py-10"><Loader size="md" /></div> : orders.length === 0 ? (
                    <p className="py-10 text-center text-sm text-[#565959]">You have no {category} orders yet.</p>
                ) : (
                    <div className="mt-4 space-y-4">
                        {orders.map((order) => (
                            <article key={order._id} className="border-t border-[#eaeded] pt-4 first:border-t-0 first:pt-0">
                                <div className="flex flex-wrap justify-between gap-2 text-sm">
                                    <span className="font-bold">Order placed {new Date(order.date).toLocaleDateString()}</span>
                                    <div>
                                        <span className="capitalize text-[#565959] mr-3">{order.status}</span>
                                         {order?.status === "paid" && <button
                                            type="button"
                                            className="inline-flex cursor-pointer items-center justify-center rounded-full border border-[#d5d9d9] bg-white px-3 py-2 text-xs font-medium text-[#0f1111] transition hover:border-[#007185] hover:bg-[#f7fafa] focus:outline-none focus:ring-2 focus:ring-[#ffd814]" onClick={() => productReturns(order._id)}
                                        >
                                            Return
                                        </button>}
                                    </div>
                                </div>
                                <div className="mt-3 space-y-3">
                                    {order.products.map(({ productId, quantity }) => (
                                        <div key={productId._id} className="flex w-full flex-col items-start justify-between gap-3 rounded-md border border-[#eaeded] bg-[#fafafa] p-3 sm:flex-row sm:items-center">
                                            <div className="flex w-full min-w-0 items-center gap-3">
                                                <img src={productId.image} alt={productId.title} className="h-16 w-16 flex-shrink-0 rounded-md object-contain" />
                                                <div className="min-w-0 text-sm">
                                                    <p className="font-medium text-[#0f1111]">{productId.title}</p>
                                                    <p className="mt-1 text-[#565959]">Qty: {quantity}</p>
                                                </div>
                                            </div>
                                        </div>
                                    ))}
                                </div>
                            </article>
                        ))}
                    </div>
                )}
            </section>
        </main>
    );
}
