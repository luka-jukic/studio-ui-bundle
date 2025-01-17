import { api } from "../../../app/api/pimcore/index";
export const addTagTypes = ["Workflows"] as const;
const injectedRtkApi = api
    .enhanceEndpoints({
        addTagTypes,
    })
    .injectEndpoints({
        endpoints: (build) => ({
            getWorkflowsDetails: build.query<GetWorkflowsDetailsApiResponse, GetWorkflowsDetailsApiArg>({
                query: (queryArg) => ({
                    url: `/studio/api/workflows/details`,
                    params: { elementId: queryArg.elementId, elementType: queryArg.elementType },
                }),
                providesTags: ["Workflows"],
            }),
            submitWorkflowAction: build.mutation<SubmitWorkflowActionApiResponse, SubmitWorkflowActionApiArg>({
                query: (queryArg) => ({
                    url: `/studio/api/workflows/action`,
                    method: "POST",
                    body: queryArg.submitAction,
                }),
                invalidatesTags: ["Workflows"],
            }),
        }),
        overrideExisting: false,
    });
export { injectedRtkApi as api };
export type GetWorkflowsDetailsApiResponse = /** status 200 Detail data of element workflows */ {
    items?: WorkflowDetails[];
};
export type GetWorkflowsDetailsApiArg = {
    /** ID of the element */
    elementId: number;
    /** Filter elements by matching element type. */
    elementType: "asset" | "document" | "data-object";
};
export type SubmitWorkflowActionApiResponse =
    /** status 200 Json encoded name of workflow, name and type of submitted action */ {
        workflowName?: string;
        actionName?: string;
        actionType?: string;
    };
export type SubmitWorkflowActionApiArg = {
    submitAction: SubmitAction;
};
export type WorkflowStatus = {
    /** color */
    color: string;
    /** colorInverted */
    colorInverted: boolean;
    /** borderColor */
    title: string;
    /** label */
    label: string;
};
export type AllowedTransition = {
    /** name */
    name: string;
    /** label */
    label: string;
    /** iconCls */
    iconCls: string;
    /** objectLayout */
    objectLayout: boolean;
    /** unsavedChangesBehaviour */
    unsavedChangesBehaviour: string;
    /** notes */
    notes: any[];
};
export type GlobalAction = {
    /** name */
    name: string;
    /** label */
    label: string;
    /** iconCls */
    iconCls: string;
    /** objectLayout */
    objectLayout: boolean;
    /** notes */
    notes: any[];
};
export type WorkflowDetails = {
    /** workflowName */
    workflowName: string;
    /** workflowStatus */
    workflowStatus: WorkflowStatus[];
    /** graph */
    graph: string;
    /** allowedTransitions */
    allowedTransitions: AllowedTransition[];
    /** globalActions */
    globalActions: GlobalAction[];
};
export type Error = {
    /** Message */
    message: string;
};
export type DevError = {
    /** Message */
    message: string;
    /** Details */
    details: string;
};
export type SubmitAction = {
    /** type of the action */
    actionType: string;
    /** id of the element */
    elementId: number;
    /** type of the element */
    elementType: string;
    /** name of the workflow */
    workflowName: string;
    /** transition */
    transition: string;
    /** workflowOptions */
    workflowOptions: any[];
};
export const { useGetWorkflowsDetailsQuery, useSubmitWorkflowActionMutation } = injectedRtkApi;
