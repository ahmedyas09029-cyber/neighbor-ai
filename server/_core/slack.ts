import { ENV } from "./env";

export type SlackMessage = {
  channel: string;
  text?: string;
  blocks?: Array<{
    type: string;
    text?: { type: string; text: string };
    fields?: Array<{ type: string; text: string }>;
    [key: string]: any;
  }>;
  attachments?: Array<{
    color?: string;
    title?: string;
    text?: string;
    fields?: Array<{ title: string; value: string; short?: boolean }>;
    [key: string]: any;
  }>;
};

/**
 * Envoie un message à Slack via le webhook configuré
 */
export async function sendSlackMessage(message: SlackMessage): Promise<boolean> {
  const webhookUrl = process.env.SLACK_WEBHOOK_URL;

  if (!webhookUrl) {
    console.warn("[Slack] Webhook URL not configured");
    return false;
  }

  try {
    const response = await fetch(webhookUrl, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(message),
    });

    if (!response.ok) {
      const detail = await response.text().catch(() => "");
      console.warn(
        `[Slack] Failed to send message (${response.status} ${response.statusText})${
          detail ? `: ${detail}` : ""
        }`
      );
      return false;
    }

    return true;
  } catch (error) {
    console.warn("[Slack] Error sending message:", error);
    return false;
  }
}

/**
 * Envoie une alerte critique à Slack
 */
export async function sendCriticalAlert(
  title: string,
  description: string,
  severity: "high" | "medium" | "low" = "high"
): Promise<boolean> {
  const severityColors = {
    high: "#FF0000",
    medium: "#FFA500",
    low: "#FFFF00",
  };

  return sendSlackMessage({
    channel: process.env.SLACK_CHANNEL || "#alerts",
    attachments: [
      {
        color: severityColors[severity],
        title: `🚨 ${title}`,
        text: description,
        fields: [
          {
            title: "Severity",
            value: severity.toUpperCase(),
            short: true,
          },
          {
            title: "Timestamp",
            value: new Date().toISOString(),
            short: true,
          },
        ],
      },
    ],
  });
}

/**
 * Envoie une notification de déploiement à Slack
 */
export async function sendDeploymentNotification(
  status: "success" | "failure",
  version: string,
  details?: string
): Promise<boolean> {
  const statusEmoji = status === "success" ? "✅" : "❌";
  const color = status === "success" ? "#36A64F" : "#FF0000";

  return sendSlackMessage({
    channel: process.env.SLACK_DEPLOYMENT_CHANNEL || "#deployments",
    attachments: [
      {
        color,
        title: `${statusEmoji} Deployment ${status.toUpperCase()}`,
        text: `Version: ${version}`,
        fields: [
          {
            title: "Status",
            value: status,
            short: true,
          },
          {
            title: "Version",
            value: version,
            short: true,
          },
          ...(details
            ? [
                {
                  title: "Details",
                  value: details,
                  short: false,
                },
              ]
            : []),
          {
            title: "Timestamp",
            value: new Date().toISOString(),
            short: false,
          },
        ],
      },
    ],
  });
}

/**
 * Envoie une notification de post critique à Slack
 */
export async function sendCriticalPostAlert(
  postId: string,
  content: string,
  category: string,
  reason: string
): Promise<boolean> {
  return sendSlackMessage({
    channel: process.env.SLACK_MODERATION_CHANNEL || "#moderation",
    attachments: [
      {
        color: "#FF6B6B",
        title: "🚨 Critical Post Detected",
        text: content.substring(0, 500),
        fields: [
          {
            title: "Post ID",
            value: postId,
            short: true,
          },
          {
            title: "Category",
            value: category,
            short: true,
          },
          {
            title: "Reason",
            value: reason,
            short: false,
          },
          {
            title: "Timestamp",
            value: new Date().toISOString(),
            short: false,
          },
        ],
      },
    ],
  });
}

/**
 * Envoie un résumé hebdomadaire à Slack
 */
export async function sendWeeklySummary(
  stats: {
    totalPosts: number;
    totalComments: number;
    totalUsers: number;
    topCategory: string;
    engagementRate: number;
  }
): Promise<boolean> {
  return sendSlackMessage({
    channel: process.env.SLACK_SUMMARY_CHANNEL || "#weekly-summary",
    attachments: [
      {
        color: "#4A90E2",
        title: "📊 Weekly Summary",
        fields: [
          {
            title: "Total Posts",
            value: stats.totalPosts.toString(),
            short: true,
          },
          {
            title: "Total Comments",
            value: stats.totalComments.toString(),
            short: true,
          },
          {
            title: "Total Users",
            value: stats.totalUsers.toString(),
            short: true,
          },
          {
            title: "Top Category",
            value: stats.topCategory,
            short: true,
          },
          {
            title: "Engagement Rate",
            value: `${(stats.engagementRate * 100).toFixed(2)}%`,
            short: true,
          },
          {
            title: "Report Date",
            value: new Date().toISOString(),
            short: true,
          },
        ],
      },
    ],
  });
}
