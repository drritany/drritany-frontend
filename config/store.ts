///This acts as store for generally used state variables

///Libraries -->
import { create } from "zustand";
import { IModalBackgroundStore, IContactModalStore, IDiscountModalStore, IOrderModalStore, IClientInfoStore, IOrderFormModalStore } from "@/config/interfaces";

//Commencing code -->

//Modal Background state store
export const useModalBackgroundStore = create<IModalBackgroundStore>((set) => ({
    modal: false,
    setModalBackground: (status) => set(() => ({ modal: status }))
}))

//Contact Modal state store
export const useContactModalStore = create<IContactModalStore>((set) => ({
    modal: false,
    setContactModal: (status) => set(() => ({ modal: status }))
}))

//Order state store
export const useOrderModalStore = create<IOrderModalStore>((set) => ({
    modal: false,
    setOrderModal: (status) => set(() => ({ modal: status }))
}))

//Order Form state store
export const useOrderFormModalStore = create<IOrderFormModalStore>((set) => ({
    modal: false,
    setOrderFormModal: (status) => set(() => ({ modal: status }))
}))

//Discount Modal state store
export const useDiscountModalStore = create<IDiscountModalStore>((set) => ({
    modal: false,
    product: { name: "", freeOption: false, poppedUp: false },
    setDiscountModal: (status) => set(() => ({ modal: status })),
    setDiscountProduct: (product) => set(() => ({ product: product }))
}))

//Client Info State Store
export const useClientInfoStore = create<IClientInfoStore>((set) => ({
    info: undefined,
    setClientInfo: (info) => set(() => ({ info: info }))
})) 