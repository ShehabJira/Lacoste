import supabase from "./supabase";

//  SIGN UP
export async function signUp({ email, password, userDataObj }) {
	let { data, error } = await supabase.auth.signUp({
		email: email,
		password: password,
		options: {
			data: userDataObj,
		},
	});

	if (error) throw new Error(error.message);

	return data;
}

//  SIGN IN
export async function signIn({ email, password }) {
	let { data, error } = await supabase.auth.signInWithPassword({
		email: email,
		password: password,
	});

	if (error) throw new Error(error.message);

	return data;
}

//  SIGN OUT
export async function signOut() {
	let { error } = await supabase.auth.signOut();
	if (error) throw new Error(error.message);
}

//  UPDATE USER
export async function updateUser({ newPassword, newUserDataObj }) {
	// Note! the user cannot update the userData and password at the same time cuz each one is in a seperated form.

	// Update password or data (as we cannot have both of them here at the same time.)
	let updatingData;
	if (newPassword) updatingData = { password: newPassword };
	if (newUserDataObj) updatingData = { data: newUserDataObj };

	const { data, error } = await supabase.auth.updateUser(updatingData);

	if (error) throw new Error(error.message);

	return data;
}

// GET CURRENT LOGED IN USER (cuz we will need to render the app directly for the loged in user [authenticated user] if he opened the website in a later time)
export async function getCurrentUser() {
	// check first if there is a user [do this by checking if there is a session returned from supabase in the localStorage]
	const { data: session } = await supabase.auth.getSession();
	if (!session.session) return null;

	// else, this means there is a current user, we need to get him from supabase, we can get him from the session but it's more secure to get from supabase.
	const {
		data: { user },
		error,
	} = await supabase.auth.getUser();
	if (error) throw new Error(error.message);
	return user;
}
