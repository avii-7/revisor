import z from "zod";
import apiClient from "../../../Network/ApiClient";
import { DashboardEndpoint } from "../../../Network/Endpoints";
import { DashboardResponse } from "../Models/DashboardResponse";

type DashboardData = z.infer<typeof DashboardResponse>;

class DashboardService {
  async getDashboardData() {
    type schema = z.infer<typeof DashboardResponse>
    const response = await apiClient.get<schema>(DashboardEndpoint.dashboard);
    return DashboardResponse.parse(response.data);
  }

  hardCodeValuesDemo(): DashboardData {
    return DashboardResponse.parse({
      profile: {
        firstName: "Demo",
        lastName: "User",
        email: "demo@revisor.app",
        profilePicture: "",
      },
      revisionInfo: {
        topText: "Up Next",
        title: "Median of Two Sorted Arrays",
        subtitle: "Scheduled for today. Estimated time: 15 minutes.",
        ctaText: "Start Revision",
      },
      revisionStats: [
        {
          id: "total-problems",
          title: "Total Problems",
          value: "342",
        },
        {
          id: "total-revisions",
          title: "Total Revisions",
          value: "1,208",
        },
        {
          id: "success-rate",
          title: "Success Rate",
          value: "94.2%",
        },
      ],
      recentMastery: [
        {
          id: "longest-palindromic-substring",
          title: "Longest Palindromic Substring",
          subtitle: "Mastered 2 hours ago - Level: Medium",
          streak: "12 Revisions",
        },
        {
          id: "lru-cache",
          title: "LRU Cache",
          subtitle: "Mastered 5 hours ago - Level: Hard",
          streak: "8 Revisions",
        },
        {
          id: "binary-tree-level-order-traversal",
          title: "Binary Tree Level Order Traversal",
          subtitle: "Mastered 1 day ago - Level: Medium",
          streak: "15 Revisions",
        },
      ],
    });
  }
}

export default DashboardService;
