export type org = {
  id: number;
  org_add: string;
  org_name: string;
  description: string;
  isTrained: number;
  contributors: string[];
  costPerPrompt: number,
  Owner_add: string;
};

export type userStorage = {
  address: string;
  cids: string[];
}

export const org_data: org[] = [
  {
    id: 1,
    org_add: "0x2014d78892fC9fFBc1D26a6269069C59c50fD481",
    org_name: "OrgA",
    description: "CNN model with expected accuracy 90.3%",
    isTrained: 0,
    contributors: [
      "0x2014d78892fC9fFBc1D26a6269069C59c50fD481",
      "0x2014d78892fC9fFBc1D26a6269069C59c50fD481",
    ],
    costPerPrompt: 0.2,
    Owner_add: ''
  },
  {
    id: 2,
    org_add: "0x2014d78892fC9fFBc1D26a6269069C59c50fD481",
    org_name: "OrgB",
    description: "CNN model with expected accuracy 90.3%",
    isTrained: 0,
    contributors: [
      "0x2014d78892fC9fFBc1D26a6269069C59c50fD481",
      "0x2014d78892fC9fFBc1D26a6269069C59c50fD481",
    ],
    costPerPrompt: 0.2,
    Owner_add: ''
  },
  {
    id: 3,
    org_add: "0x2014d78892fC9fFBc1D26a6269069C59c50fD481",
    org_name: "OrgC",
    description: "CNN model with expected accuracy 90.3% dffhsdjklfhsdfjksdhfjksdhfdjkfhdf dfjkldhfsdkjfhsd fsdfhsdJKL FDF ASDFKASDJFHADJFHAJKFSDFJADF  DFD FASDJFDF ADFDF SDFHJKGDFJSDF ",
    isTrained: 0,
    contributors: [
      "0x2014d78892fC9fFBc1D26a6269069C59c50fD481",
      "0x2014d78892fC9fFBc1D26a6269069C59c50fD481",
    ],
    costPerPrompt: 0.2,
    Owner_add: ''
  },
  {
    id: 4,
    org_add: "0x2014d78892fC9fFBc1D26a6269069C59c50fD481",
    org_name: "OrgD",
    description: "CNN model with expected accuracy 90.3%",
    isTrained: 0,
    contributors: [
      "0x2014d78892fC9fFBc1D26a6269069C59c50fD481",
      "0x2014d78892fC9fFBc1D26a6269069C59c50fD481",
    ],
    costPerPrompt: 0.2,
    Owner_add: ''
  },
];


// export type 
