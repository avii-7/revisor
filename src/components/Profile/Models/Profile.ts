export default class Profile {

    firstName: string;
    lastName: string;
    email: string;
    profilePicture: string;

    constructor(firstName: string, lastName: string, email: string, profilePicture: string) {
        this.firstName = firstName
        this.lastName = lastName
        this.email = email
        this.profilePicture = profilePicture
    }
}