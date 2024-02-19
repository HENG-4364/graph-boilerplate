import { Graph } from "src/generated/graph";
import ContextType from "src/graphql/ContextType";
import moment from "moment-timezone";
export const ActivityLogsList = async (
  _,
  { pagination }: { pagination: Graph.PaginationInput },
  ctx: ContextType
) => {
  const knex = await ctx.knex.default;
  const query = knex.table("activity_log");

  if (pagination?.size && pagination?.page) {
    const offset = (pagination?.page - 1) * pagination?.size;
    query.offset(offset).limit(pagination?.size);
  }
  const activityLogsQuery = await query;
  const activityLogsList = activityLogsQuery.map((activityLog) => ({
    ...activityLog,
    created_at: moment(activityLog.created_at)
      .tz("Asia/Phnom_Penh")
      .format("DD/MMM/YYYY"),
    updated_at: moment(activityLog.updated_at)
      .tz("Asia/Phnom_Penh")
      .format("DD/MMM/YYYY"),
  }));
  const activityLogCount = await knex.table("activity_log");
  return {
    data: [...activityLogsList],
    pagination: {
      size: pagination?.size,
      total: activityLogCount?.length,
      current: pagination?.page || 1,
    },
  };
};
