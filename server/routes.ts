import type { Express } from "express";
import { createServer, type Server } from "http";
import { storage } from "./storage";
import { insertChatMessageSchema } from "@shared/schema";

export async function registerRoutes(app: Express): Promise<Server> {
  // Chat message endpoints
  app.post("/api/chat/messages", async (req, res) => {
    try {
      const validatedData = insertChatMessageSchema.parse(req.body);
      const message = await storage.createChatMessage(validatedData);
      res.json(message);
    } catch (error) {
      res.status(400).json({ error: "Invalid message data" });
    }
  });

  app.get("/api/chat/messages", async (_req, res) => {
    try {
      const messages = await storage.getAllChatMessages();
      res.json(messages);
    } catch (error) {
      res.status(500).json({ error: "Failed to fetch messages" });
    }
  });

  // Mock enterprise data endpoints for future expansion
  app.get("/api/enterprise/salesforce/opportunities", async (_req, res) => {
    res.json({ message: "Salesforce integration endpoint ready" });
  });

  app.get("/api/enterprise/gmail/messages", async (_req, res) => {
    res.json({ message: "Gmail integration endpoint ready" });
  });

  app.get("/api/enterprise/gdrive/files", async (_req, res) => {
    res.json({ message: "Google Drive integration endpoint ready" });
  });

  app.get("/api/enterprise/notion/pages", async (_req, res) => {
    res.json({ message: "Notion integration endpoint ready" });
  });

  const httpServer = createServer(app);
  return httpServer;
}
