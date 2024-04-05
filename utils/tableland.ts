import { Database } from "@tableland/sdk";
import { publicClient, get_pk_walletClient } from "./viemClient";
import type { Signer } from "ethers";
import { org } from "@/types/globalTypes.types";

const signer = get_pk_walletClient();
const db = new Database({ signer });

export const createTable = async (tableName: string, fields: string) => {
  const signer = get_pk_walletClient() as any as Signer; // Cast the signer variable to the correct type
  const db = new Database({ signer });

  const { meta: create } = await db
    .prepare(`CREATE TABLE ${tableName} (${fields});`)
    .run();

  return create.txn!.name;
};

// org: id integer primary key, org_name text, org_add text, description text,isTrained integer, contributors text
export const addOrg = async (data: org) => {
  const { meta: insert } = await db
    .prepare(
      `INSERT INTO org_314159_818 (org_name, org_add, description, isTrained, contributors) VALUES (?, ?, ?, ?, ?);`
    )
    .bind(data.org_name, data.org_add, data.description, data.isTrained, data.contributors)
    .run();
  const hash = insert.txn!.transactionHash as `0x${string}` ;
  await publicClient.waitForTransactionReceipt({ hash });
  console.log("Added to Org data");
};

/* 
dao data (dao_data_314159_337 ): 
id integer primary key, org_name text, owner_add text, description text,reward integer, pages integer, contract_add text

people ( people_314159_395 ): 
id integer primary key, dao_add text, user_add text, role text, contribution_json text, reward_released_bool integer
*/

// export const add_row_dao_data = async (
//   org_name,
//   desc,
//   owner_add,
//   reward,
//   pages,
//   contract_add
// ) => {
//   const signer = get_pk_walletClient()
//   const db = new Database({ signer })
//   const { meta: insert } = await db
//     .prepare(
//       `INSERT INTO dao_data_314159_337 (org_name, owner_add, description, reward, pages, contract_add) VALUES (?, ?, ?, ?, ?, ?);`
//     )
//     .bind(org_name, owner_add, desc, reward, pages, contract_add)
//     .run()
//   const hash = insert.txn.transactionHash
//   console.log(hash)
//   await publicClient.waitForTransactionReceipt({ hash })
//   console.log('Added to dao data')
// }

// export const add_row_people = async (dao_add, user_add, role) => {
//   const signer = get_pk_walletClient()
//   const db = new Database({ signer })
//   const { meta: insert } = await db
//     .prepare(
//       `INSERT INTO people_314159_395 (dao_add, user_add, role, contribution_json, reward_released_bool) VALUES (?, ?, ?, ?, ?)`
//     )
//     .bind(dao_add, user_add, role, '', 0)
//     .run()
//   const hash = insert.txn.transactionHash
//   await publicClient.waitForTransactionReceipt({ hash })
//   console.log('Added people')
// }

// export const get_dao_data = async () => {
//   let headersList = {
//     Accept: '*/*'
//   }

//   let response = await fetch(
//     'https://testnets.tableland.network/api/v1/query?statement=select%20%2A%20from%20dao_data_314159_337',
//     {
//       method: 'GET',
//       headers: headersList,
//       next: { revalidate: 10 }
//     }
//   )
//   if (!response.ok) {
//     console.log('In error')
//     throw new Error('Failed to fetch data')
//   }
//   let data = await response.json()
//   return data
// }

// export const get_people = async () => {
//   let headersList = {
//     Accept: '*/*'
//   }

//   let response = await fetch(
//     'https://testnets.tableland.network/api/v1/query?statement=select%20%2A%20from%20people_314159_377',
//     {
//       method: 'GET',
//       headers: headersList
//     }
//   )
//   if (!response.ok) {
//     console.log('In error')
//     throw new Error('Failed to fetch data')
//   }
//   let data = await response.json()
//   return data
// }

// export const add_contribution = async (user_add, dao_add, contribution) => {
//   const signer = get_pk_walletClient()
//   const db = new Database({ signer })
//   const stmt = await db
//     .prepare(
//       `UPDATE people_314159_395 SET contribution_json='${contribution}' WHERE user_add='${user_add}' and dao_add='${dao_add}'`
//     )
//     .run()
//   const hash = stmt.meta.txn.transactionHash
//   await publicClient.waitForTransactionReceipt({ hash })
//   console.log('Added Contribution')
// }
