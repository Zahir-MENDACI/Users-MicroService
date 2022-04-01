import * as admin from "firebase-admin";
import { getFirestore } from 'firebase-admin/firestore'
import { initializeApp } from 'firebase-admin/app'



export class FirebaseService {
  private static instance: FirebaseService;

  db: admin.firestore.Firestore;
  auth: admin.auth.Auth;
  //admin: any

  constructor() {
    const serviceAccount: any = {
      type: "service_account",
      project_id: "users-microservice-9cc72",
      private_key_id: "d6a4a67cfe3330ac5b79f0b4217849b95e94bd75",
      private_key: "-----BEGIN PRIVATE KEY-----\nMIIEvQIBADANBgkqhkiG9w0BAQEFAASCBKcwggSjAgEAAoIBAQCuEz8LNRNCpKdS\nonD/d9QcasVm5qdY7nd7vS0eAWQcDYGThZ0IsMuGdgexuXk8ixCSERG9shwlzRgc\nmWUnT1Xe1kZPRIjkBDX+q5vvUuJmmnPcURRpxYYOjV6EHldEBAkbPhcfrDDBBvfK\nSA803lcdAgINMQE2hTgrCQktyhqPF8I9ol9Fzc+a5flxnc+zR3+2XK8dFoA7WldC\nGEI9CiEav54atqwA53/PoQAa2Odx1f8U94tFbJA/oUseIA11Q6RcF2rpDUAU8TnU\n5Ykr+cpoNykVi+amxYKrPvKA2YaXBAG0bliICY5E3HUwrI4Z1nGerHouInuZWz+K\ncY5kmL4LAgMBAAECggEAM/mrKT1/srZW/2VhN+YffxyiNEdKUFNjeZ7SidMAgR/H\nQLT0XlPrcQps4bPvbxRWrkZKdclofiDuwhtLCKG3kgGInMJp3SsktBWpSZwF3Xzg\nezf6UFqZ3F55ihlFFRnfXjL71IklRX0/HzbE05RPjmm7ExU+t3ivfKoGA5YEuBRx\nr82qK3f5dMO66B2S4VYHaU3sXOb3aWO2S7c5m1YbYQ5USS/1WxCyVjIcJjZKAzex\n0spzhac3OlYS8uqhilAll+qoPld6XahiA6+IxLoI6MhZ4lCdf9IoKpEDUhY/Q899\n0hkmUI0+/yVCnz1ZMvm+S8UXTBEcJKMo3cGcSC9vAQKBgQDgRM8+Dhku0A/a4j5U\n4kLdTliT0/OXkZW0M+fcIHSFPHUXKh+EYYTPgoEr3/cESMWMbiXyJCk8FmhrL5+Z\nsfvVSEP6lKW0f8bFFpHVLlXh5gSYd95LjsOm5G4nPBnPpCtj8Tz5woDy/Fd+dNus\n2w/LbmOgNnmszRHMwasX4ZULCQKBgQDGtGKX/h05biTUGJOqjlZdVsgqokOBrCJq\nwWaLIMZK+gD8RU9gae3r3iA3jHxdEgQ9w/aQwXZxp7ADm6RlrHFBeIGXkHu8SZCb\n8CAMDy/EDMBzK+EZ79Jyh+YsJM6PC8WL8wlHno2i3bW2acMp4B/NrZ+t/qqVk/0U\nKLd4RHvBcwKBgQCIHTsrDqN6Jg15a5cpLaonZ0WbcyiE9XdGx7oRgCE4PFlUldxL\nHGTfDPYZCvWBRCmh8bhWHlxoe7EkXOMhBUUzTYj0rQNlaafaNriMCnNVh6WCZD4m\n3Z8hy8KPTYrc22b6YZAAhmx9DWqM9Z/eaZZMgdM1idqPZmdHPsP42pD7AQKBgDO2\nfnJQEAsCP1NzkfqxUIi6LR3rXOZChjKCYs2SmgipR9hfsWjGKMVZ6ciLJ1KRfckV\nVvYVY13w5j4KI57SYidH1XI8h/dYrenndG+vBB9hsjRHFy5I29wywhR6/8b6qU7i\n0WdyPCpGySPQIpqjWaONrCD8RijnetXkQttp90tBAoGAE98TW9Mn31OD9HtEq9RL\nGhRPD0bnT8kw8ISDT+2XiwzKVMJ181alfOYak0ZdgUTpxsrhg/gLEilEtd6powQn\nJitxsNinLBGhwAtmTzE1pllGyh0r9TT+wqoQLPgxBGEB/uwjCueSDYDkt80yKTxG\nOM7N2q16K0ceAPf17H0D950=\n-----END PRIVATE KEY-----\n",
      client_email: "firebase-adminsdk-gaa9d@users-microservice-9cc72.iam.gserviceaccount.com",
      client_id: "115247393955693843337",
      auth_uri: "https://accounts.google.com/o/oauth2/auth",
      token_uri: "https://oauth2.googleapis.com/token",
      auth_provider_x509_cert_url: "https://www.googleapis.com/oauth2/v1/certs",
      client_x509_cert_url: "https://www.googleapis.com/robot/v1/metadata/x509/firebase-adminsdk-gaa9d%40users-microservice-9cc72.iam.gserviceaccount.com"
    };

    initializeApp({
      credential: admin.credential.cert(serviceAccount),
    });


    this.db = getFirestore();

    console.log("Created new instance of FirestoreService");
  }

  static getInstance(): FirebaseService {
    if (!FirebaseService.instance) {
      FirebaseService.instance = new FirebaseService();
    }
    return FirebaseService.instance;
  }
}
