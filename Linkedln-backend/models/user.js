const mongoose = require('mongoose');

const UserSchema = new mongoose.Schema({

    googleId: {
        type: String,
    },
    email: {
        type: String,
        required: true,
    },
    password: {
        type: String,
    },
    f_name: {
        type: String,
        default: "",
    },
    headline: {
        type: String,
        default: "",
    },
    curr_company: {
        type: String,
        default: "",
    },
    curr_location: {
        type: String,
        default: "",
    },
    profilePic: {
        type: String,
        default: "data:image/jpeg;base64,/9j/4AAQSkZJRgABAQAAAQABAAD/2wCEAAkGBwgHBgkIBwgKCgkLDRYPDQwMDRsUFRAWIB0iIiAdHx8kKDQsJCYxJx8fLT0tMTU3Ojo6Iys/RD84QzQ5OjcBCgoKDQwNGg8PGjclHyU3Nzc3Nzc3Nzc3Nzc3Nzc3Nzc3Nzc3Nzc3Nzc3Nzc3Nzc3Nzc3Nzc3Nzc3Nzc3Nzc3N//AABEIAJQAqwMBIgACEQEDEQH/xAAaAAEAAwEBAQAAAAAAAAAAAAAAAwQFAQIH/8QAMBAAAgIABAMHBAEFAQAAAAAAAAECAwQRITESMlEFEyJBYXGBQlKRobEjM2KS8BX/xAAVAQEBAAAAAAAAAAAAAAAAAAAAAf/EABQRAQAAAAAAAAAAAAAAAAAAAAD/2gAMAwEAAhEDEQA/APuIAAAAAAclJRTcnkkB05KUYrOUkl6soX4/6aVl/kylOc7JZzk5P1A07MdTHlbl7IhfaL+mv8sogC5/6Fn2ROrtGefiri/ZlIFRow7QrfPCUf2WK76rOSafoYwRFbwMmnGW16N8cejNCjEQuXheq3TAmAAAAAAAAAAAA8W2RqrcpbIDl10aYcUn7LqZWIvnfLOT8Pkjl9srp8UvhdCMAANfIqB1RcuVNk9VGidmvoTpJbJIiqfdWfYzzKEo80WvgvnAKALdtEZ7eF9UVZRcZZNaoDgi3BpxeTWzQBUaWExfeZQsyU/J+TLhgmlgsT3i7ux+NbPqRVwAAAAAAAAycbf3tnDF+CLy92Xsbb3VDafilojJAAAqBPhq8/G/gg30L8UoxS6IDoAIoAABFiK+KOa3X7JTgFAHu5cNkkeCoHYycWpReTTzRwAbOHtV1Smt/NEpl9n28FvA3pL+TUIoAAABxgZvaM+K5QW0V+yoe7pcds5dWzwAABUdhzx9y+9zPWjzL6fElIiugAAAAAAAqYn+78IiPd7UrW1seAgACgm0846NG5XJThGS2azMM1ez5cWGXo2iKsgAAcm8ot9FmdPNnJL2YGGDi2R0qAAAFnDTzXA91sVhm1qt/IDQBDVcpZKej69SYigAAEd8+COm72FlsYer6FSUpTbcgOAAqAAAGj2W/wCnNeuZnGh2Xy2e6AvAAigAAwWnFuL8tAT42HBiJ+uqICoAAAASV0ynq9EBGe4SsjyOXwWYU1x8s31Z7X/ZEVX47/tf+p4nK583El0yLgAzwXpQjLmimQzw/nB/DArgNOMspJpgqAAAGl2YsqZP7pGabGFhwYeC2eWpFTAAAAAKPaVeitXlozPNuyCshKL2aMayDrscJLVaZgeQs20ks8x7blumrgXi5mVHKqVHWW/QmAIoAAAAAAADzKCmspbFOyuUH6eTLx5lFSi4yWgFEHqyDhLJ/B5KiTD197bGHV6+xtFPs+ngg7Jby29i4RQAAAAAKmOw/eR44rxR/aLYAyMNXrxv4LJNbV9UduhCAAAAAAAAAAAAAAebIKceH8EOEw8rbMpLKMN/UtQg5vJfktQiorKOwHVollodAAAAAAAAAAENlKlrHR/yTACi04vJrIFyUVJZNJoinR9r+AIAenXNfSzyAAAAHVGT2TZJGiT3yQERLXTKXNov2SxqjHVLX1JAORSSyS0OgAAAAAAAAAAAAAAAAADmSAAcMei/ASS2SAA6AAAAAAAAAAAAA//Z",
    },
    cover_pic: {
        type: String,
        default: "data:image/jpeg;base64,/9j/4AAQSkZJRgABAQAAAQABAAD/2wCEAAkGBwgHBgkIBwgKCgkLDRYPDQwMDRsUFRAWIB0iIiAdHx8kKDQsJCYxJx8fLT0tMTU3Ojo6Iys/RD84QzQ5OjcBCgoKDQwNGg8PGjclHyU3Nzc3Nzc3Nzc3Nzc3Nzc3Nzc3Nzc3Nzc3Nzc3Nzc3Nzc3Nzc3Nzc3Nzc3Nzc3Nzc3N//AABEIAJQBCwMBIgACEQEDEQH/xAAYAAEBAQEBAAAAAAAAAAAAAAAAAQIDBP/EACsQAQEAAQMDAwMEAgMAAAAAAAABEQIhMUFRYRJxgSKRsUJSodEy4RNywf/EABUBAQEAAAAAAAAAAAAAAAAAAAAD/8QAFBEBAAAAAAAAAAAAAAAAAAAAAP/aAAwDAQACEQMRAD8A8QC6YlVnFtBrMnNwk34T0y81ZMcAoAAADMsmctM3yCb3kxenBtnlvPaAk43UAAAEvx8xUoMZk6xZZ3iz1dNOSy3mYoKqSYUAABnjeSZaAZ8746Z6H4MWXPM7LMUEmeeJ5aZ59vy0AAAMdc52b54AAAAABnVmdAaRJd8LLkFABFAAAAZur9stJq3xZgGgARQAAAGbb106vsTVp66se4NAAJdMv9d1AAABLZOWf+TT3AamMbbMtSAoAAAJcJPp41Rpm/8AUEzc8brpszcZ+Sbz/PTmEt2gNCKAAAzWksBM39N2QxauAWcKAAACZVASau1q7XmSl1Sbf+M7Xm4BqKzJJvLloAAAAGKFgDWIoAAAAAGQARQAAAAAAAAAAAAAADJkAAAAAAATGT0+f4VMAoAAJbemAMpKfVe2Fkk4BQAAABE1TPMt9gaS56TKTTj9F+/+ySZ/xs+QX4x7KAAACVWdVxgC29KZqcczPi9Tjrzx/QNiSxQAAAQEt7XdN+uqGM8HpvYGpfKszTvx/DQAAAAJd5zhizHR0TAJJnmtAAAAAAl9s/KnwDE9E4l+6zbpY190+AUAAABLMqAzi9U524z99TaTYCTHOP6UAAAEqgOdnuenx/DoZBiZ7VszQAAGfVFlyYhAUAAAAqU5uen5BPV4vuqarbxwkst2mMcg2HQAAAKJZ32AzO8T1S8fhNveeyy572fgGgAAAEqs3a51bTp5A53zieVzvjG8QmcbdAaGZqz4UFAAABPdPXp7z7reExOwJ9XZqKAAAAAM4vHS9WksBmNYmCRQAAAAGbmNAMZn7791+rHOfLWNP7QEnCgAAAlmZhQGJcXF47rdOfZbJeU3l9M4Bc9OoY7cKAAAADNqxcaQAABLcbF9ss5lmdWmwGs7ZonnakmIDQigAAIrNvjILkYxP1ZWc7cA2AAAAACZJU+ntkxemr4BoSKAAAAAzbUvubzrnwDU4VNO/RQAAAAXTpmva5+HP1avX6bduAAskuyyY3AGuQAAAGKABFAVQAAAMZAGcYUATq0AAACKAwAC6WgAAB//2Q==",
    },
    about: {
        type: String,
        default: "",
    },
    skills: {
        type: [String],
        default: [],
    },
    experience: [
        {
            designation: {
                type: String,
            },
            company_name: {
                type: String,
            },
            duration: {
                type: String,
            },
            location: {
                type: String,
            },

        }
    ],
    friends: [
        {
            type: mongoose.Schema.Types.ObjectId,
            ref: "user",
        }
    ],
    pending_friends: [
        {
            type: mongoose.Schema.Types.ObjectId,
            ref: "user",
        }
    ],

    resume: {
        type: String,
    },
}, { timestamps: true });

const userModel = mongoose.model('user', UserSchema);
module.exports = userModel;