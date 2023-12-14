import conf from "../conf/conf";

import { Client, ID, Databases, Storage, Query } from 'appwrite';

export class Service {
    client = new Client();
    databases;
    bucket;

    constructor() {
        this.client
            .setEndpoint(conf.appwriteUrl)
            .setProject(conf.appwriteProjectId)
        this.databases = new Databases(this.client)
        this.bucket = new Storage(this.client);

    }

    async createPost({ title, slug, status, content, featuredImage, userId }) {
        try {
            this.databases.createDocument(
                conf.appwriteDatabaseId,
                conf.appwriteCollectionId,
                slug,
                {
                    title,
                    content,
                    status,
                    userId,
                    featuredImage
                }
            )
        } catch (error) {
            console.log("Appwrite service :: createPost :: error", error)
        }
    }

    async updatePost(slug, { title, content, featuredImage, status }) {
        try {
            await this.databases.updateDocument(
                conf.appwriteDatabaseId,
                conf.appwriteCollectionId,
                slug,
                {
                    title,
                    content,
                    featuredImage,
                    status
                }
            )
        } catch (error) {
            console.log("Appwrite service :: createPost :: error", error)
        }
    }

    async deletePost(slug) {
        try {
            await this.databases.deleteDocument(
                conf.appwriteDatabaseId,
                conf.appwriteCollectionId,
                slug
            )
            return true;
        } catch (error) {
            console.log("Appwrite service :: createPost :: error", error)
            return false;
        }
    }

    async getPost(slug) {
        try {
            await this.databases.getDocument(
                conf.appwriteDatabaseId,
                conf.appwriteCollectionId,
                slug
            )
        } catch (error) {
            console.log("Appwrite service :: createPost :: error", error)
        }
    }

    async getPosts(quaries = [Query.equal("status", "active")]) {
        try {
            await this.databases.listDocuments(
                conf.appwriteDatabaseId,
                conf.appwriteCollectionId,
                quaries
            )
        } catch (error) {

        }
    }

    // file upload service

    async uploadFile(file) {
        try {
            return await this.bucket.createFile(
                conf.appwriteBucketId,
                ID.unique(),
                file
            )
        } catch (error) {
            console.log("Appwrite service :: upload file :: error", error)
            return false;
        }
    }

    async deleteFile(fileId) {
        try {
            await this.bucket.deleteFile(
                conf.appwriteBucketId,
                fileId
            )
            return true;
        } catch (error) {
            console.log("Appwrite service :: deleteFile :: error", error)
            return false
        }
    }

    getFilePreview(fileId) {

        return this.bucket.getFilePreview(
            conf.appwriteBucketId,
            fileId
        )

    }


    // this function is for update file this is created for future use
    async updateFile({ fileId, file }) {
        try {
            return await this.bucket.updateFile(
                conf.appwriteBucketId,
                fileId,
                file
            )
        } catch (error) {
            console.log("Appwrite service :: updateFile :: error", error)
            return false
        }
    }

    // download file
    async downloadFile(fileId){
        try {
           return await this.bucket.getFileDownload(
                conf.appwriteBucketId,
                fileId
            )
        } catch (error) {
            console.log("Appwrite service :: downloadFile :: error", error)
            return false;
        }
    }


}
const service = new Service()
export default service;