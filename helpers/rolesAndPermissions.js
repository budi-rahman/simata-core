// const redis = require("./redis");
const { RolePermission, Role, Permission } = require("../models");

async function mapRolesAndPermissions() {
  let rp = await RolePermission.findAll({
    raw: true,
    attributes: ["id"],
    include: [
      { model: Role, as: "role", attributes: ["name"] },
      { model: Permission, as: "permission", attributes: ["name"] },
    ],
  });

  rp = rp.reduce(
    (p, c) => ({
      ...p,
      [c["role.name"]]: { ...p[c["role.name"]], [c["permission.name"]]: true },
    }),
    {},
  );

  return Promise.resolve(rp);
}

async function inMemoryRolesAndPermissions() {
  const rp = await mapRolesAndPermissions();
  // await redis.set("rv:permissions", JSON.stringify(rp)).catch((err) => `PANIC_ERROR CAN'T PERSISTS DATA IN MEMOERY ${err}`);
}

async function getPermissions() {
  // let rp = await redis.get("rv:permissions");
  // return Promise.resolve(JSON.parse(rp));
  return {}
}

async function checkPermission(role, permission) {
  // let rp = await getPermissions();
  // if (!rp[role]) {
  //   return false;
  // }
  // return rp[role][permission];
  return true
}

module.exports = { mapRolesAndPermissions, getPermissions, checkPermission, inMemoryRolesAndPermissions };
