import { describe, it, expect, beforeEach, vi } from "vitest";
import {
  sendSlackMessage,
  sendCriticalAlert,
  sendDeploymentNotification,
  sendCriticalPostAlert,
  sendWeeklySummary,
} from "./slack";

// Mock fetch
global.fetch = vi.fn();

describe("Slack Integration", () => {
  beforeEach(() => {
    vi.clearAllMocks();
    process.env.SLACK_WEBHOOK_URL = "https://hooks.slack.com/services/test";
    process.env.SLACK_CHANNEL = "#alerts";
    process.env.SLACK_DEPLOYMENT_CHANNEL = "#deployments";
    process.env.SLACK_MODERATION_CHANNEL = "#moderation";
    process.env.SLACK_SUMMARY_CHANNEL = "#summary";
  });

  describe("sendSlackMessage", () => {
    it("should send a message successfully", async () => {
      (global.fetch as any).mockResolvedValueOnce({
        ok: true,
        text: async () => "ok",
      });

      const result = await sendSlackMessage({
        channel: "#test",
        text: "Test message",
      });

      expect(result).toBe(true);
      expect(global.fetch).toHaveBeenCalledWith(
        "https://hooks.slack.com/services/test",
        expect.objectContaining({
          method: "POST",
          headers: { "Content-Type": "application/json" },
        })
      );
    });

    it("should return false when webhook URL is not configured", async () => {
      delete process.env.SLACK_WEBHOOK_URL;

      const result = await sendSlackMessage({
        channel: "#test",
        text: "Test message",
      });

      expect(result).toBe(false);
    });

    it("should handle fetch errors gracefully", async () => {
      (global.fetch as any).mockRejectedValueOnce(new Error("Network error"));

      const result = await sendSlackMessage({
        channel: "#test",
        text: "Test message",
      });

      expect(result).toBe(false);
    });
  });

  describe("sendCriticalAlert", () => {
    it("should send a high severity alert", async () => {
      (global.fetch as any).mockResolvedValueOnce({
        ok: true,
        text: async () => "ok",
      });

      const result = await sendCriticalAlert(
        "Database Down",
        "Database connection failed",
        "high"
      );

      expect(result).toBe(true);
      expect(global.fetch).toHaveBeenCalled();

      const callArgs = (global.fetch as any).mock.calls[0];
      const body = JSON.parse(callArgs[1].body);
      expect(body.attachments[0].color).toBe("#FF0000");
    });

    it("should send a medium severity alert with orange color", async () => {
      (global.fetch as any).mockResolvedValueOnce({
        ok: true,
        text: async () => "ok",
      });

      const result = await sendCriticalAlert(
        "High Memory Usage",
        "Memory usage is above 80%",
        "medium"
      );

      expect(result).toBe(true);

      const callArgs = (global.fetch as any).mock.calls[0];
      const body = JSON.parse(callArgs[1].body);
      expect(body.attachments[0].color).toBe("#FFA500");
    });
  });

  describe("sendDeploymentNotification", () => {
    it("should send a success deployment notification", async () => {
      (global.fetch as any).mockResolvedValueOnce({
        ok: true,
        text: async () => "ok",
      });

      const result = await sendDeploymentNotification(
        "success",
        "v1.2.3",
        "All tests passed"
      );

      expect(result).toBe(true);

      const callArgs = (global.fetch as any).mock.calls[0];
      const body = JSON.parse(callArgs[1].body);
      expect(body.attachments[0].color).toBe("#36A64F");
      expect(body.attachments[0].title).toContain("✅");
    });

    it("should send a failure deployment notification", async () => {
      (global.fetch as any).mockResolvedValueOnce({
        ok: true,
        text: async () => "ok",
      });

      const result = await sendDeploymentNotification(
        "failure",
        "v1.2.2",
        "Build failed"
      );

      expect(result).toBe(true);

      const callArgs = (global.fetch as any).mock.calls[0];
      const body = JSON.parse(callArgs[1].body);
      expect(body.attachments[0].color).toBe("#FF0000");
      expect(body.attachments[0].title).toContain("❌");
    });
  });

  describe("sendCriticalPostAlert", () => {
    it("should send a critical post alert", async () => {
      (global.fetch as any).mockResolvedValueOnce({
        ok: true,
        text: async () => "ok",
      });

      const result = await sendCriticalPostAlert(
        "post-123",
        "Inappropriate content",
        "Safety",
        "Contains offensive language"
      );

      expect(result).toBe(true);

      const callArgs = (global.fetch as any).mock.calls[0];
      const body = JSON.parse(callArgs[1].body);
      expect(body.attachments[0].title).toContain("🚨");
      expect(body.attachments[0].color).toBe("#FF6B6B");
    });
  });

  describe("sendWeeklySummary", () => {
    it("should send a weekly summary", async () => {
      (global.fetch as any).mockResolvedValueOnce({
        ok: true,
        text: async () => "ok",
      });

      const result = await sendWeeklySummary({
        totalPosts: 150,
        totalComments: 450,
        totalUsers: 50,
        topCategory: "Safety",
        engagementRate: 0.75,
      });

      expect(result).toBe(true);

      const callArgs = (global.fetch as any).mock.calls[0];
      const body = JSON.parse(callArgs[1].body);
      expect(body.attachments[0].title).toContain("📊");
      expect(body.attachments[0].color).toBe("#4A90E2");
    });
  });
});
