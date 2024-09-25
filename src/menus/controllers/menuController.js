import React, { useContext, useEffect, useState } from "react";
import { useHttpClient } from "../../shared/hooks/http-hook";
import { AuthContext } from "../../shared/context/auth-context";

	const { isLoading, error, sendRequest, clearError } = useHttpClient();


export function insertMenu(data) {
	// let menus = getAllMenus();
	// data["id"] = generateMenuId();
	// menus.push(data);
	// localStorage.setItem(KEYS.menus, JSON.stringify(menus));
}

export function updateMenu(data) {
	// let menus = getAllMenus();
	// let recordIndex = menus.findIndex((x) => x.id == data.id);
	// menus[recordIndex] = { ...data };
	// localStorage.setItem(KEYS.menus, JSON.stringify(menus));
}

export function deleteMenu(id) {
	// let menus = getAllMenus();
	// menus = menus.filter((x) => x.id != id);
	// localStorage.setItem(KEYS.menus, JSON.stringify(menus));
}

export function generateMenuId() {
	// if (localStorage.getItem(KEYS.menuId) == null)
	// 	localStorage.setItem(KEYS.menuId, "0");
	// var id = parseInt(localStorage.getItem(KEYS.menuId));
	// localStorage.setItem(KEYS.menuId, (++id).toString());
	// return id;
}

export function getAllMenus() {

	useEffect(() => {
		const fetchMenus = async () => {
			try {
				const responseData = await sendRequest(
					process.env.REACT_APP_BACKEND_URL + "/menus/list"
				);
				console.log("menulist :", responseData.menus);
				return responseData.menus;
			} catch (err) {
				console.log("fokol :", err);
			}
		};
		fetchMenus();
	}, [sendRequest]);
		
}
