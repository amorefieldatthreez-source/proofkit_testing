/**
 * Put your custom overrides or transformations here.
 * Changes to this file will NOT be overwritten.
 */
import { z } from "zod/v4";
import {
  ZAddresses as ZAddresses_generated,
  ZEmailAddresses as ZEmailAddresses_generated,
  ZPhoneNumbers as ZPhoneNumbers_generated,
  ZVLPhoneType as ZVLPhoneType_generated,
  ZVLEmailType as ZVLEmailType_generated,
  ZVLAddressType as ZVLAddressType_generated,
  ZVLTitle as ZVLTitle_generated,
  ZContacts as ZContacts_generated,
} from "./generated/Contacts";
import type { InferZodPortals } from "@proofkit/fmdapi";

export const ZAddresses = ZAddresses_generated;

export type TAddresses = z.infer<typeof ZAddresses>;

export const ZEmailAddresses = ZEmailAddresses_generated;

export type TEmailAddresses = z.infer<typeof ZEmailAddresses>;

export const ZPhoneNumbers = ZPhoneNumbers_generated;

export type TPhoneNumbers = z.infer<typeof ZPhoneNumbers>;

export const ZVLPhoneType = ZVLPhoneType_generated;

export type TVLPhoneType = z.infer<typeof ZVLPhoneType>;

export const ZVLEmailType = ZVLEmailType_generated;

export type TVLEmailType = z.infer<typeof ZVLEmailType>;

export const ZVLAddressType = ZVLAddressType_generated;

export type TVLAddressType = z.infer<typeof ZVLAddressType>;

export const ZVLTitle = ZVLTitle_generated;

export type TVLTitle = z.infer<typeof ZVLTitle>;

export const ZContacts = ZContacts_generated;

export type TContacts = z.infer<typeof ZContacts>;

export const ZContactsPortals = {
  Addresses: ZAddresses,
  "Email Addresses": ZEmailAddresses,
  "Phone Numbers": ZPhoneNumbers,
};

export type TContactsPortals = InferZodPortals<typeof ZContactsPortals>;
