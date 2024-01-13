import { Service } from "@prisma/client";
import prisma from "../../../shared/prisma";

const createService = async (data: Service) => {

    const result = await prisma.service.create({ data });
    return result;
}


const getAllService = async (query: any) => {
    const andConditions: any[] = [];
    if (Object.keys(query)?.length > 0) {
        Object.keys(query)?.map(key => {
            andConditions.push({
                [key]: query[key]
            })
        })
    }

    const whereConditions: any = andConditions?.length > 0 ? { AND: andConditions } : {};

    const result = await prisma.service.findMany({
        where: whereConditions,
        include: {
            booking: {
                select: {
                    id: true
                }
            }
        }
    });
    return result;
};

const getServiceDetails = async (id: string) => {
    const result = await prisma.service.findFirst({
        where: {
            id,
        },
        include: {
            schedule: {
                include: {
                    booking: true
                }
            },
            review: {
                include: {
                    user: {
                        select: {
                            fullName: true,
                            email: true
                        }
                    }
                }
            },
            category: true,
            booking: true
        }
    });
    return result;
};

const updateService = async (id: string, data: any) => {

    const result = await prisma.service.update({
        where: {
            id,
        },
        data
    });

    return result;
};
const getServiceForAddReview = async (userId: string) => {
    const result = await prisma.booking.findMany({
        where: {
            AND: [
                { userId },
                { status: 'DELIVERED' },
                {
                    NOT: {
                        service: {
                            review: {
                                some: {
                                    userId
                                }
                            }
                        }
                    }
                }
            ]
        },
        select: {
            serviceId: true,
            status: true,
            service: true,
            createdAt: true
        }
    });

    return result;


};


const deleteService = async (id: string) => {
    const result = await prisma.service.delete({
        where: {
            id,
        },
    });
    return result;
};

const makeComment = async (data: any) => {
    const result = await prisma.comment.create({
        data: data
    })
    return result;
}
const getServiceComments = async (serviceId: string) => {
    const result = await prisma.comment.findMany({
        where: {
            serviceId
        },
        include: {
            user: {
                select: {
                    fullName: true
                }
            },
            replies: {
                select: {
                    createdAt: true,
                    reply: true,
                    user: {
                        select: {
                            fullName: true
                        }
                    }
                }
            }
        }
    })
    return result;
}

const makeReply = async (data: any) => {
    const result = await prisma.reply.create({
        data: data
    })
    return result;
}

export const ServiceService = {
    createService,
    getAllService,
    getServiceDetails,
    updateService,
    deleteService,
    getServiceForAddReview,
    makeComment,
    getServiceComments,
    makeReply
}